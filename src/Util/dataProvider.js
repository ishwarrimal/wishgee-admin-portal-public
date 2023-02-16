import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "react-admin";
import { RecentResults, WishRecommendation } from "../mock";

/**
 * Maps react-admin queries to a REST API implemented using Java Spring Boot and Swagger
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        if(params.filter){
          let { q } = params.filter;
          const filter = q ? `&filter=${q}` : ''
          url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}${filter}`;
        }else{
          url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
        }
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = {
          filter: JSON.stringify({ id: params.ids }),
        };
        let idStr = "";
        params.ids.map((id) => idStr + `id=${id}`);
        url = `${apiUrl}/${resource}?${idStr}}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
        break;
      }
      case UPDATE: {
        let { updateResult, updateStatusType, id, ...record } = params.data;
        if (updateResult) {
          resource = "result";
          let { ...re } = record.result;
          id = record.result.id;
          record = re;
        } else if (updateStatusType) {
          resource = `wish`;
          let re = { status: record.status };
          record = re;
        }
        url = `${apiUrl}/${resource}?id=${id}`;
        options.method = "PUT";
        options.body = JSON.stringify(record);
        break;
      }
      case CREATE: {
        let { updateResult, ...record } = params.data;
        if (updateResult) {
          resource = `wish/${params.data?.id}`;
          let { ...re } = record.result;
          record = re;
        }
        url = `${apiUrl}/${resource}`;
        options.method = "POST";
        options.body = JSON.stringify(record);
        break;
      }
      case DELETE:
        url = `${apiUrl}/${resource}?id=${params.id}`;
        options.method = "DELETE";
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { data } = response.json;
    console.log(data);
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!data.hasOwnProperty("totalElements")) {
          throw new Error(
            "The numberOfElements property must be must be present in the data response"
          );
        }
        return {
          validUntil: new Date(new Date().getTime() + 5 * 60000),
          data: data.contents,
          total: parseInt(data.totalElements, 10),
        };
      case CREATE:
        return { data: { ...params.data, id: data.id } };
      default:
        return {
          validUntil: new Date(new Date().getTime() + 5 * 60000),
          data: data,
        };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }
    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${resource}?id=${id}`, {
            method: "DELETE",
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json),
      }));
    }
    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    // if(url.indexOf("wish/wishRecommendation") > 0){
    //   return Promise.resolve(WishRecommendation).then(data => convertHTTPResponse({json: data}, type, resource, params));
    // }
    // if(url.indexOf("wish/results") > 0){
    //   return Promise.resolve(RecentResults).then(data => convertHTTPResponse({json: data}, type, resource, params));
    // }
    // if (url.indexOf("wish/reviewed") > 0 && options?.method !== "PUT") {
    //   return Promise.resolve(PendingData).then((data) =>
    //     convertHTTPResponse({ json: data }, type, resource, params)
    //   );
    // }
    // if (url.indexOf("/crm/product/types/") > 0 && options?.method !== "PUT") {
    //   return Promise.resolve(WishTypeList).then((data) =>
    //     convertHTTPResponse({ json: data }, type, resource, params)
    //   );
    // }
    // else {
    return httpClient(url, options).then(
      (response) =>
        response && convertHTTPResponse(response, type, resource, params)
    );
    // }
  };
};
