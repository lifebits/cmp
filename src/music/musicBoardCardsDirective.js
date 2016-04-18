'use strict';

import playlistTemplate from './views/music-board-card.html';

const playList = function(){
    return {
        restrict: 'E',
        scope: {},
        template: playlistTemplate,
        controllerAs: 'MusicBoardCards',
        controller: function(MobileDetectService, MusicAppService) {

            MusicAppService.getCardList()
                .then(
                    result => {
                        this.cardsList = result;

                        //console.log(this.cardsList);
                    }
                );

            this.isMobile = MobileDetectService.any();

        }
    }
};

export default playList;