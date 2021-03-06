projectUnify.controller('ChatCtrl', function ($scope,
                                                 $rootScope,
                                                 $stateParams,
                                                 $state,
                                                 $filter,
                                                 $ionicScrollDelegate,
                                                 messageService) {
  $scope.$on('$ionicView.enter', function () {
    $scope.currentUser = $rootScope.currentUser.user;
    $scope.conversation = $stateParams.conversation;
    $ionicScrollDelegate.scrollBottom();
    messageService.updateMessageStatus({id: $scope.conversation.id}, function (response) {
      console.log(response);
    });
  });

  $scope.sendReply = function (conversation, message) {
    var conversation_id = conversation.id;
    var subject = conversation.subject;
    messageService.composeReply({
      conversation_id: conversation_id,
      subject: subject,
      message: message
    }, function (data) {
      $scope.conversations = null;
      $scope.newMessage = null;
      messageService.getConversations(function (response) {
          $scope.conversations = response.conversations;
          var new_conversation = getById($scope.conversations, conversation_id);
          $state.go($state.current, {conversation: new_conversation}, {reload: true});
        }
      );


    });

    function getById(arr, id) {
      for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d].id === id) {
          return arr[d];
        }
      }
    }
  }
});
