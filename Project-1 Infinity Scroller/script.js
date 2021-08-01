const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let photosArray=[];


//unsplash api
const count=10;
const apikey='x2bSjwymCSe3VTl5N64cfmd0GmfFWemqMQ28j0Hicws';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  


// crete elements for links & photos, add to dom
function displayPhotos(){
    photosArray.forEach((photo)=>{
        //create <a> to link to unsplash
        const item =document.createElement('a');
        setAttribute(item,{
            href: photo.links.html,
            target: '_blank',
        });

        //create img for photo
        const img=document.createElement('img');
        setAttribute(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
            
        });
        // put <img> inside <a> . then put both of them in image container.
        item.appendChild(img);  
        imageContainer.appendChild(item);
    });
}


// get photos from unsplash api 

async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        
        photosArray = await response.json();
        displayPhotos();
       

    }catch(error){
//catch error here
console.log(error);
    }
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      getPhotos();
      console.log('load more');
    }
  });
// onload
getPhotos();