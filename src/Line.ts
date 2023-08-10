const MESSAGE_RECEIVE = {
    "destination": "U30a22bb09cc459ca5926e9718af12248",
    "events": [
        {
            "type": "message",
            "message": {
                "type": "text",
                "id": "464849621223473369",
                "text": "Hh"
            },
            "webhookEventId": "01H5V1B21A8FGNCRCE9CA564CX",
            "deliveryContext": {
                "isRedelivery": false
            },
            "timestamp": 1689903269483,
            "source": {
                "type": "user",
                "userId": "Uf0b67cadbf93f8a045edcf5d6df14c5c"
            },
            "replyToken": "8e25176ab90847f3880bcacfb0d7dc42",
            "mode": "active"
        }
    ]
}

const TEST_EVENT = {
    "destination": "U30a22bb09cc459ca5926e9718af12248",
    "events": []
}

const BLOCK = {
    "destination": "U30a22bb09cc459ca5926e9718af12248",
    "events": [
      {
        "type": "unfollow",
        "webhookEventId": "01H5V1MT0GA6PTK1K4Q0KNZX8K",
        "deliveryContext": {
          "isRedelivery": false
        },
        "timestamp": 1689903589337,
        "source": {
          "type": "user",
          "userId": "Uf0b67cadbf93f8a045edcf5d6df14c5c"
        },
        "mode": "active"
      }
    ]
  }

  const FOLLOW = {
    "destination": "U30a22bb09cc459ca5926e9718af12248",
    "events": [
      {
        "type": "follow",
        "webhookEventId": "01H5V1NT1EM4XJMN0M6SK77D79",
        "deliveryContext": {
          "isRedelivery": "falsesdsdsdsd"
        },
        "timestamp": 1689903621799,
        "source": {
          "type": "user",
          "userId": "Uf0b67cadbf93f8a045edcf5d6df14c5c"
        },
        "replyToken": "6d76bb6ff864462ebb85e4befefb26cf",
        "mode": "active"
      }
    ]
  }