const _apiUrl = "/api/tag";

export const getAllTags = () => {
    return fetch(`${_apiUrl}/Index`)
        .then((res) => {
            if(!res.ok) {
              throw new Error('Error fetching tags')
            }
            return res.json()
          })
          .catch(error => console.log(error.message))
      };
    
      export const addTag = (tag) => {
        return fetch(`${_apiUrl}/Create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
        });
      };