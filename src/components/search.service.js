export const SearchService = function SearchService($http, $httpParamSerializer, $q) {
  'ngInject';

  // const API_URL = 'http://localhost:8080'; // dev
  const API_URL = 'https://api.ontariotechu.ca/directory'; // prod
  // const API_URL = 'https://uoit-api.herokuapp.com'; // cloud
  const API_V2 = 2;
  const API_V3 = 3;

  const replaceText = item => item.replace(/-|UOIT|/g, '').replace(/&/g, 'and').replace(/-| OT|/g, '').replace(/OT|/g, '').replace(/OT |/g, '');
  const processList = items =>
    items.map(item => {
      if (item.department) {
        item.department = replaceText(item.department);
      } else {
        item = replaceText(item);
      }
      return item;
    });
  const extractData = ({
    data = []
  } = {}) => processList(data);
  const handleError = listName => err => {
    console.error(`Error loading ${listName} data:`, err);
    throw new Error(
      listName ? `cannot load ${listName} data` : err.message || 'an unknown error occurred'
    );
  };

  return {
    get(endpoint = '', version = null) {
      const url = version ? `${API_URL}/v${version}/${endpoint}` : `${API_URL}/${endpoint}`;
      return $http
        .get(url, {
          cache: true
        })
        .then(({
          data
        }) => {
          // New API format has metadata and data properties, no success property
          if (version) {
            // Versioned APIs (like experts) still use success property
            return data && data.success ? data : handleError('directory')(data);
          } else {
            // New directory API format has metadata and data
            return data && data.metadata && data.data ? data : handleError('directory')(data);
          }
        })
        .catch(err => {
          if (err.status !== -1) {
            throw err;
          }
        });
    },

    getUsers(params = {}) {
      return this.get(`?${$httpParamSerializer(params)}`)
        .then(extractData)
        .catch(handleError('person'));
    },
    getDepts() {
      return this.get('list/department')
        .then(extractData)
        .catch(handleError('department'));
    },
    getExpert(person) {
      const {
        firstname,
        lastname
      } = person;
      const params = $httpParamSerializer({
        firstname,
        lastname
      });
      // Use new expert API endpoint
      return $http
        .get(`https://api.ontariotechu.ca/experts/search?${params}`, {
          cache: true
        })
        .then(({
          data
        }) => {
          // Handle new expert API response format
          return data && data.metadata && data.data && data.data.length ? data.data[0] : false;
        })
        .catch(err => {
          console.error('Error loading expert data:', err);
          return false;
        });
    },
    getExpertise() {
      // Use new expertise list API endpoint
      return $http
        .get('https://api.ontariotechu.ca/experts/list/expertise/', {
          cache: true
        })
        .then(({
          data
        }) => {
          // Handle new expertise API response format
          return data && data.metadata && data.data ? data.data : [];
        })
        .catch(err => {
          console.error('Error loading expertise data:', err);
          return [];
        });
    }
  };
};