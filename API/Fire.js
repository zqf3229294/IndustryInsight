import config from '../config';
import firebase from 'firebase';
require('firebase/firestore');

class Fire {
    constructor() {
        if (!firebase.app.length) {
            firebase.initializeApp(config.firebaseConfig);
        }
    }

    // addPost = async ({ text, localUri }) => {
    //   const remoteUri = await this.uploadPhotoAsync(
    //     localUri,
    //     `photos/${this.uid}/${Date.now()}`
    //   );

    //   return new Promise((res, rej) => {
    //     this.firestore
    //       .collection('posts')
    //       .add({
    //         text,
    //         uid: this.uid,
    //         timestamp: this.timestamp,
    //         image: remoteUri
    //       })
    //       .then(ref => {
    //         res(ref);
    //       })
    //       .catch(error => {
    //         rej(error);
    //       });
    //   });
    // };

    addPost = async ({ type, date, time, groupSize, location, description }) => {
        // const remoteUri = await this.uploadPhotoAsync(
        //     localUri,
        //     `photos/${this.uid}/${Date.now()}`
        // );

        return new Promise((res, rej) => {
            this.firestore
                .collection('posts')
                .add({
                    type,
                    date,
                    time,
                    groupSize,
                    location,
                    description,
                    uid: this.uid,
                    timestamp: this.timestamp
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                'state_changed',
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    createUser = async user => {
        let remoteUri = null;

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection('users').doc(this.uid);

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            }); 

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(
                    user.avatar,
                    `avatars/${this.uid}`
                );

                db.set({ avatar: remoteUri }, { merge: true });
            }
            console.log("successful sign up");
        } catch (error) {
            alert(error);
        }
    };

    updateProfilePicture = async (remoteUri) => {
        try {
            let db = this.firestore.collection('users').doc(this.uid);
            db.set({ avatar: remoteUri}, {merge: true});
            console.log("updated profile picture (Fire)");

        } catch (error) {
            alert(error);
        }

    };

    getUserData = () => {
        let db = this.firestore.collection('users').doc(this.uid);
        db.get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data());
                return doc.data()
            }
            console.log("doc doens't exists!");

        }).catch((error) => {
            console.log(error);
        });
    };


    // docRef.get().then(function(doc) {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });
    // test.firestore.js
    

    signOut = () => {
        try {
            return firebase.auth().signOut();
        } catch (error) {
            console.log("error:", error);
        }
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
