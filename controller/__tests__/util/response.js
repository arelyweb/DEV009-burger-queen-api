
module.exports = {
    getusersRes : {
        "pagination": {
            "page": 3,
            "pageSize": 1,
            "numberOfPages": 5
        },
        "link": {
            "first": "/products?page=1&limit=1",
            "prev": "/products?page=2&limit=1",
            "next": "/products?page=4&limit=1",
            "last": "/products?page=5&limit=1"
        },
        "result": [
            {
                "id": "6509fa23a6d2491345d7bcc1",
                "email": "omarbell@email.com",
                "role": "waiter"
            }
        ]
    }
}