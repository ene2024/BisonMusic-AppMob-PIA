#**Modifications**:
-In the *global-service* service, the necessary code was added to obtain the access token for the Spotify API. When trying to log in, it redirects you to Spotify's default verification page. Upon granting access, Spotify provides the access token, which we then store. The token lasts for 3600 seconds, so we have a button to *refresh the token*.

-Additionally, in the *Spotify service*, we implemented the logic to obtain the data of the user who has logged into the app, displaying their profile picture (if available), username, ID, among other things.

-Finally, in the *Tab1 component*, buttons were added for logging in. When pressed, it redirects you to the authorization page. Once you log in, an *ngIf* now displays the information of the logged-in user along with two buttons: *log out* and *refresh the token*, whose functionality was explained earlier.

![Perro Riendose](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz20EFsq7hgglFIzNMQTfu1ErkOjwaJRT4ZCzGhIWXTmUX6IGSGhqt7K8Uf6TNl11y4wU&usqp=CAU)