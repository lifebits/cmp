'use strict';

musicAppService.$inject = ['$http', '$stateParams'];

export default function musicAppService($http, $stateParams) {

    this.getCardsGroup = () => {
        let domain = [
            {name: "Exclusive", domainName: "exclusive_muzic"},
            {name: "Club", domainName: "public_of_music"},
            {name: "Indie", domainName: "indie_music"},
            {name: "Instrumental", domainName: "artmelody"},
            {name: "Life", domainName: "gooddaday"},
            {name: "Overnight", domainName: "nightmelody"},
            {name: "Pop ", domainName: "plmusic"},
            {name: "Rap", domainName: "rapnewrap"},
            {name: "Rock", domainName: "rock_music_on"},
            {name: "Rock-2", domainName: "1rock.music"},
            {name: "Soundtrack", domainName: "ostmelody"},
            {name: "etc", domainName: "mzk"},
            {name: "18+", domainName: "prayforsex.official"}
        ];
        return domain;
    };

    this.getCardList = () => {
        return getJSONFromVK()
            .then(
                response => {
                    let data = response.data;

                    if ("error" in data) {
                        console.log("Error Code: " + data.error['error_code']);
                        console.log(data.error['error_msg']);
                        return false;
                    }
                    let itemsReceived = data.response.items;

                    let cardList = [];
                    let playlist = [];//????

                    itemsReceived.forEach(function(item) {
                        let checkMusic = false;
                        let newItem = {
                            photo: [],
                            audio: []
                        };

                        for (let prop in item) {

                            newItem.id = item.id;
                            newItem.date = item.date;

                            if (prop == "attachments") {

                                let attachmentsElem = item[prop];

                                for (let prop in attachmentsElem) {
                                    let incAttachmentsElem = attachmentsElem[prop];
                                    if (incAttachmentsElem.type == "photo") {
                                        newItem.photo.push(incAttachmentsElem.photo);
                                    }
                                    if (incAttachmentsElem.type == "audio") {
                                        checkMusic = true;
                                        newItem.audio.push(incAttachmentsElem.audio);
                                        playlist.push(incAttachmentsElem.audio);
                                    }
                                }

                            }

                        }

                        if (checkMusic == true) {
                            cardList.push(newItem);
                        }

                    });

                    /*let result = {
                        cardList: cardList,
                        playList: playlist
                    }

                    console.dir(result);*/

                    return cardList;
                }
            );
    };

    let getJSONFromVK = () => {
        //https://api.vk.com/method/wall.get?v=5.25&filter=owner&domain=rock_music_on&count=4&offset=0&callback=JSON_CALLBACK
        return $http.jsonp(constructedURL())
            .then(
                response => response,
                error => console.log(error)
            )
    };

    let constructedURL = () => {
        let opts = {
            domainName: $stateParams.playlistId,
            count: 8
        };

        return 'https://api.vk.com/method/wall.get?v=5.25&filter=owner&domain='+opts.domainName+'&count='+opts.count+'&offset=0&callback=JSON_CALLBACK'
    }

};