
// window.onload = function() {
  // setSelection('COPA Forum');
// }

function searchString() {
  window.query_string = document.getElementById('query_string').value;
  selection = document.getElementById("selection").innerHTML;
  setSelection(selection);
  // if (selection == 'Wiki and Blog') {
  //   requestFromWiki();
  // } else if (selection == 'Magazine') {
  //   requestFromMagazine();
  // } else if (selection == 'COPA Forum') {
  //   requestFromCOPA();
  // }
}

function setSelection(selection){
  document.getElementById("selection").innerHTML = selection;
  if (selection == 'Wiki and Blog') {
    requestFromWiki();
  } else if (selection == 'Magazine') {
    requestFromMagazine();
  } else if (selection == 'COPA Forum') {
    requestFromCOPA();
  } else if (selection == 'Youtube') {
    requestFromYT();
  } else if (selection == 'AVWeb') {
    requestFromAVWeb();
  }
}

function requestFromCOPA() {
  var xhr = new XMLHttpRequest();
  const url = "http://0.0.0.0:8000/fetchcopa?searchterm=";
  xhr.open(
    'GET',
    url + window.query_string,
    true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        var res_json = JSON.parse(xhr.responseText);
        formatCOPAForum(res_json);
      }
    }
    xhr.send();
}

function requestFromAVWeb() {
  var xhr = new XMLHttpRequest();
  const url = "http://0.0.0.0:8000/fetchavweb?searchterm=";
  xhr.open(
    'GET',
    url + window.query_string,
    true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        var res_json = JSON.parse(xhr.responseText);
        console.log(res_json);
        formatAVWeb(res_json);
      }
    }
    xhr.send();
}

function requestFromYT() {
  var xhr = new XMLHttpRequest();
  const url = "http://0.0.0.0:8000/fetchyt?searchterm=";
  xhr.open(
    'GET',
    url + window.query_string,
    true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        var res_json = JSON.parse(xhr.responseText);
        // console.log(res_json);
        formatYoutube(res_json);
      }
    }
    xhr.send();
}

function requestFromWiki() {
  var xhr = new XMLHttpRequest();
  const url =  'http://search-wikiblog-gv65dajcbf5dxrsdwwrjyogvnm.us-west-1.cloudsearch.amazonaws.com/2013-01-01/search?q=';
  xhr.open(
    'GET',
    url + window.query_string,
    true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        var res_json = JSON.parse(xhr.responseText);
        formatWikiBlog(res_json);
        // setSelection(res_json);
      }
    }
    xhr.send();
}

function requestFromMagazine() {
  var xhr = new XMLHttpRequest();
  const url =  'http://search-magazine-0430-45r2xlihhxs5kqu25j2djuz7ea.us-west-1.cloudsearch.amazonaws.com/2013-01-01/search?q=';
  xhr.open(
    'GET',
    url + window.query_string,
    true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        var res_json = JSON.parse(xhr.responseText);
        formatMagazine(res_json);

      }
    }
    xhr.send();
}

function formatAVWeb(json) {
  var output = "";
  for (i = 0; i < json.length; i++) {

          output += '<div class="post"><div class="wrap-ut pull-left"><div class="userinfo pull-left"><div class="avatar"><img src="images/avatar.jpg" alt="" /></div></div><div class="posttext pull-left"><h2><a target="_blank"  href="' + json[i]['link'] +'">' + json[i]['title'] +
           '</a></h2><p>' + json[i]['summary'] +
           '</p></div><div class="clearfix"></div></div><div class="postinfo pull-left"><div class="comments"><div class="commentbg"><div class="mark"></div></div></div><div class="views"><i class="fa fa-eye"></i> </div><div class="time"><i class="fa fa-book"></i> ' + json[i]['author'] +
           '</div></div><div class="clearfix"></div></div>';
      }
    document.getElementById("all-posts").innerHTML = output;
}

function formatYoutube(json) {
  var output = "";
  for (i = 0; i < json.length; i++) {

          output += '<div class="post"><div class="wrap-ut pull-left"><div class="userinfo pull-left"><div class="avatar"><img src="images/avatar.jpg" alt="" /></div></div><div class="posttext pull-left"><h2><a target="_blank"  href="' + json[i]['url'] +'">' + json[i]['title'] +
           '</a></h2><p>' + json[i]['content'].substring(0,200) +
           '</p></div><div class="clearfix"></div></div><div class="postinfo pull-left"><div class="comments"><div class="commentbg">' + json[i]['views'] +
           '<div class="mark"></div></div></div><div class="views"><i class="fa fa-eye"></i> ' + json[i]['views'] +
           '</div><div class="time"><i class="fa fa-book"></i> ' + json[i]['duration'] +
           '</div></div><div class="clearfix"></div></div>';
      }
    document.getElementById("all-posts").innerHTML = output;
}

function formatCOPAForum(json) {
  var output = "";
  for (i = 0; i < json['topics'].length; i++) {

          output += '<div class="post"><div class="wrap-ut pull-left"><div class="userinfo pull-left"><div class="avatar"><img src="images/avatar.jpg" alt="" /></div></div><div class="posttext pull-left"><h2><a target="_blank"  href="' + 'https://forum.cirruspilots.org/t/' + json['posts'][i]['id'] + '/'+json['posts'][i]['post_number']  +'">' + json['topics'][i]['title'] +
           '</a></h2><p>' + json['posts'][i]['blurb'] +
           '</p></div><div class="clearfix"></div></div><div class="postinfo pull-left"><div class="comments"><div class="commentbg">' + json['posts'][i]['like_count'] +
           '<div class="mark"></div></div></div><div class="views"><i class="fa fa-eye"></i> ' + json['topics'][i]['reply_count'] +
           '</div><div class="time"><i class="fa fa-book"></i> ' + json['topics'][i]['posts_count'] +
           '</div></div><div class="clearfix"></div></div>';
      }
    document.getElementById("all-posts").innerHTML = output;
}
//
// function formatCOPAForum(json) {
//   var output = "";
//   // all_hits = json['topics'];
//   // console.log(all_hits[1]['fields']);
//   for (i = 0; i < json['topics'].length; i++) {
//
//           output += '<div class="post"><div class="wrap-ut pull-left"><div class="userinfo pull-left"><div class="avatar"><img src="images/avatar.jpg" alt="" /></div></div><div class="posttext pull-left"><h2><a target="_blank"  href="' + 'https://forum.cirruspilots.org/t/' + json['posts'][i]['id'] + '/'+json['posts'][i]['post_number']  +'">' + json['topics'][i]['title'] +
//            '</a></h2><p>' + json['posts'][i]['blurb'] +
//            '</p></div><div class="clearfix"></div></div><div class="postinfo pull-left"><div class="comments"><div class="commentbg">' + json['posts'][i]['like_count'] +
//            '<div class="mark"></div></div></div><div class="views"><i class="fa fa-eye"></i> ' + json['topics'][i]['reply_count'] +
//            '</div><div class="time"><i class="fa fa-book"></i> ' + json['topics'][i]['posts_count'] +
//            '</div></div><div class="clearfix"></div></div>';
//       }
//     document.getElementById("all-posts").innerHTML = output;
// }

function formatWikiBlog(wiki_json) {
  var output = "";
  all_hits = wiki_json['hits']['hit'];
  console.log(all_hits[1]['fields']);
  for (i = 0; i < all_hits.length; i++) {

          output += '<div class="post"><div class="wrap-ut pull-left"><div class="userinfo pull-left"><div class="avatar"><img src="images/avatar.jpg" alt="" /></div></div><div class="posttext pull-left"><h2><a href="#">' + all_hits[i]['fields']['title'] +
           '</a></h2><p>' + all_hits[i]['fields']['body'].substring(0,200) +
           '</p></div><div class="clearfix"></div></div><div class="postinfo pull-left"><div class="comments"><div class="commentbg">' + all_hits[i]['fields']['totalreplies'] +
           '<div class="mark"></div></div></div><div class="views"><i class="fa fa-eye"></i> ' + all_hits[i]['fields']['totalviews'] +
           '</div><div class="time"><i class="fa fa-book"></i> ' + all_hits[i]['fields']['source'] +
           '</div></div><div class="clearfix"></div></div>';
      }
    document.getElementById("all-posts").innerHTML = output;
}



function formatMagazine(wiki_json) {
  var output = "";
  all_hits = wiki_json['hits']['hit'];
  console.log(all_hits[1]['fields']);
  for (i = 0; i < all_hits.length; i++) {

          output += '<div class="post"><div class="wrap-ut pull-left"><div class="userinfo pull-left"><div class="avatar"><img src="images/avatar.jpg" alt="" /></div></div><div class="posttext pull-left"><h2><a target="_blank"  href="' + all_hits[i]['fields']['link'] + '">' + all_hits[i]['fields']['article'] +
           '</a></h2><p>' + all_hits[i]['fields']['content'].substring(0,200) +
           '</p></div><div class="clearfix"></div></div><div class="postinfo pull-left"><div class="comments"><div class="commentbg">' + all_hits[i]['fields']['number'] +
           '<div class="mark"></div></div></div><div class="views"><i class="fa fa-eye"></i> ' + all_hits[i]['fields']['name'] +
           '</div><div class="time"><i class="fa fa-book"></i> ' + all_hits[i]['fields']['author'] +
           '</div></div><div class="clearfix"></div></div>';
      }
    document.getElementById("all-posts").innerHTML = output;
}
