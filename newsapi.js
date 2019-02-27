

$(document).ready(function(){
    
    $("#searchbtn").on("click",function(e){
      e.preventDefault();
      
      let query = $("#searchquery").val();
      let url = "https://newsapi.org/v2/everything?q="+query+"&apiKey=37b858f16fcc4b4c8e9bd93d6b2c24e6";
      
// https://newsapi.org/v2/everything?q=bitcoin&apiKey=37b858f16fcc4b4c8e9bd93d6b2c24e6
      if(query !== ""){
        
        $.ajax({
          
          url: url,
          method: "GET",
          dataType: "json",
          
          beforeSend: function(){
            $("#loader").show();
          },
          
          complete: function(){
            $("#loader").hide();
          },
          
          success: function(news){
            let output = "";
            let latestNews = news.articles;
            
            for(var i in latestNews){
              output +=`
                <div class="col l12 m6 s12">
                <h4>${latestNews[i].title}</h4>
                <img src="${latestNews[i].urlToImage}" class="responsive-img">
                <p>${latestNews[i].description}</p>
                <p>${latestNews[i].content}</p>
                <p>Published on: ${latestNews[i].publishedAt}</p>
                <a href="${latestNews[i].url}" class="btn">Read more</a>
                </div>
              `;
            }
            
            if(output !== ""){
              $("#newsResults").html(output);
             
              
            }else{
              let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. <br>Try searching for something else </div>`;
               $("#newsResults").html(noNews);
              
            }
            
          },
          
          error: function(){
             let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
            
             </div>`;
             
            $("#newsResults").html(internetFailure);
             
          }
          
          
        });
        
      }else{
        let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;"></div>`;
        $("#newsResults").html(missingVal);
         alert("Please enter something")
      }
      
    });
    
});