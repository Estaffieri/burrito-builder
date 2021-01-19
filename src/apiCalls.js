export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error
        }
      })
      .catch(error => {
        return "No orders yet!"
      })
}

export const postOrder = (name, ingredients) => {
   fetch('http://localhost:3001/api/v1/orders', {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      "name" : name,
      "ingredients" : ingredients
    })
  })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        throw Error
      }
    })
    .catch(error => {
      alert ("Oops! Looks like something went wrong. Please try again.")
    })
}