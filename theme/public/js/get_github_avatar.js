function get_github_avatar(username) {
  $.getJSON('https://api.github.com/users/' + username, function (data){
    // TBD
    // do something with data
  })
}