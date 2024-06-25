# BandFish
Bandfish is a conceptual spin off of BandCamp done by Joe Rashid. This project incorporates my favorite aspects of the BandCamp website, and includes in-depth feature emulation of its real-life counterpart. Users can explore an expansive list of albums, with details pages for each featuring artist information, reviews and tracks that can be freely streamed (FOR DEMONSTRATIVE PURPOSES ONLY). The application supports user-created content, allowing members to upload their own albums, podcasts, and songs or episodes. They can read and write reviews, leaving feedback for both artists and future customers. With an intuitive interface, users can signup and make their profile page their own with avatars and banners, customize their albums/podcasts or change track information, and place orders for other artists' content directly through the application. The service aims to streamline the digital audio marketplace, ensuring an enjoyable and thoughtful experience for all users.

## Live Link
[https://bandfish.onrender.com](https://bandfish.onrender.com)

## Connect with the creator!
[Joe Rashid on LinkedIn](https://www.linkedin.com/in/joseph-rashid/)

---
## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Hosting:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Wiki
[View the wiki's table of contents here](https://github.com/poedude5229/BandFish/wiki)

## Endpoints

### Log In User
- Method: POST
- URL: `/api/auth/login`
- Body:

    ```json
    {
      "email": "joemama@email.com",
      "password": "password123"
    }
    ```
- Successful Response:
  ```json
  {
    "email": "joemama@email.com",
    "firstname": "Joe",
    "lastname": "Mama",
    "id": 3,
    "role": "User",
    "username": "joemama",
    "profile_banner": "https://bandfishbucket.s3.amazonaws.com/indianajonesbanner.jpg",
    "profile_pic": "https://bandfishbucket.s3.amazonaws.com/1c69f339e921465fb528ef78a5f87e76.jpg",
    "wishlists": [{"id": 1, "product": {"album_art": "https://i.scdn.co/image/ab67616d0000b27361b7e027205d656d5b14b473", "artist_id": 5, "genre": "Ska", "id": 11, "name": "Feel Like That (feat. Bradley Nowell)", "price": "4.99", "type": "Single"  } }]
  ```

---
## Albums
### Create an Album
- Method: POST
- URL: `/api/albums/new`
- Body:

    ```json
    {  
   "album_art": "https://images.squarespace-cdn.com/content/v1/58d952abbf629acc7be750e4/5c5cb10b-30de-4b4c-ad43-b44bfaa657a6/lpotl+text+only+logo.jpg?format=1500w",
    "artist": "The Last Podcast Network",
    "artist-pfp": "https://bandfishbucket.s3.amazonaws.com/lpn.jpg",
    "artist_id": 6,
    "genre": "True Crime/Comedy",
    "id": 1,
    "name": "The Last Podcast on the Left",
    "price": "5.99",
    "type": "Podcast"
    }
    ```

- Successful Response:
  ```json
  {
  "album_art": "https://images.squarespace-cdn.com/content/v1/58d952abbf629acc7be750e4/5c5cb10b-30de-4b4c-ad43-b44bfaa657a6/lpotl+text+only+logo.jpg?format=1500w",
  "artist": "The Last Podcast Network",
  "artist_id": 6,
  "artist_pfp": "https://bandfishbucket.s3.amazonaws.com/lpn.jpg",
  "genre": "True Crime/Comedy",
  "id": 1,
  "name": "The Last Podcast on the Left",
  "price": "5.99",
  "reviews": [],
  "tracks": [],
  "type": "Podcast",
  "wishlists": []
  }
  ```

---

### View all Albums and Podcasts
 - Method: GET
 - URL: `/api/albums/all`
 - Body: none

 - Successful Response:
 ```txt
There are many more albums and podcasts but for the truncation of this document, the general structure of this response is just tens of more albums and podcasts in objects in this array
```
   ```json
    {
     "albums_and_podcasts": [
    {
      "album_art": "https://images.squarespace-cdn.com/content/v1/58d952abbf629acc7be750e4/5c5cb10b-30de-4b4c-ad43-b44bfaa657a6/lpotl+text+only+logo.jpg?format=1500w",
      "artist": "The Last Podcast Network",
      "artist-pfp": "https://bandfishbucket.s3.amazonaws.com/lpn.jpg",
      "artist_id": 6,
      "genre": "True Crime/Comedy",
      "id": 1,
      "name": "The Last Podcast on the Left",
      "price": "5.99",
      "type": "Podcast"
    },
    ]
   }
   ```

- Users can browse the website to find an album or a podcast they enjoy, and stream the tracks from that group for their enjoyment. Upon signing up, a user can choose a profile picture avatar for themselves, as well as a banner for their profile's page.
```txt
- ℹ️: Podcasts are treated like an album, albeit with a larger collection of tracks, the same way that Spotify or iTunes classify Podcasts.
```
- Users can "shop" for albums or podcasts, and add them to their cart. They can complete a simplified checkout process. Users can add podcasts or albums to their wishlist from the details page of that track group.
- Bandfish supports user-created content as well, allowing artists to publish their work and host their albums on the site. 

On their

## Database Schema
![Schema png](https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716932696/BandFish_Database_Schema_hhaafd.png)

## Landing Page Wireframe
![landing page](https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716882113/landing_ngxzdf.png)

## Example Product Details Wireframe
![product details](https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716882124/Desktop_-_1_yrdaaa.png)

## Example Profile page and Collection
![Profile / Collection](https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716882113/Profile_-_Collection_jpygqa.png)

## Example Profile page and Wishlist
![Profile / Wishlist](https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716882123/Profile_-_Wishlist_bspoik.png)

## Uploading media wireframe
![Uploading content](https://res.cloudinary.com/dyr9v2ynr/image/upload/v1716882123/Create_An_Album_fxkafi.png)
