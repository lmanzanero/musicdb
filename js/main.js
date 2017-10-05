(function musicDB(){
  this.init = function(){
    this.search();
  };

  this.search = function(){
    var form = document.querySelector("#form");

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var value = document.querySelector("#input_search").value;
      form.reset();

      getData(value.split(' ').join("+"));

    });
  };

  this.getData = function(artist){
    var http = new XMLHttpRequest();
    var url = "https://itunes.apple.com/search?term="+artist+"&enitiy=album";
    var method = "GET";

    var container = document.querySelector("#album_list_container");
    container.innerHTML = "";

    http.open(method, url);
    http.onreadystatechange = function(){
      if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
          showArtist(JSON.parse(http.response));
      }else if(http.readyState === XMLHttpRequest && http.status !== 200) {

      }
    };
    http.send();
  };

  this.showArtist = function(obj){
    var container = document.querySelector("#album_list_container");
    var template = '';
   if (obj.results.length > 0) {
     document.querySelector("#not_match").style.display = "none";
     for (var i = 0; i < obj.results.length; i++) {
       console.log(obj.results[i]);
       template += `
         <div class="col-sm-3 album_item">
           <div class="item_thmb" style="background: url(${obj.results[i].artworkUrl100})"></div>
           <div class="item_title">${obj.results[i].collectionName}</div>
           <div class="item_price">
             <span>Price:</span> ${obj.results[i].collectionPrice}
           </div>
           <a href="${obj.results[i].collectionViewUrl}" target="_blank"> Buy Now </a>
         </div>
       `;
     }
      container.innerHTML = template;
   }else {
     document.querySelector("#not_match").style.display = "block";
   }

  };



  this.init();
})();
