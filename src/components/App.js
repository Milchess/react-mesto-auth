import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePlacePopup from "./ConfirmDeletePlacePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import { Route, Switch} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [card, setCard] = useState(null);

    useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInformation()])
            .then(([cards, user]) => {
                setCards(cards);
                setCurrentUser(user);
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(err => {
            console.log(`Ошибка.....: ${err}`)
        });
    }

    function handleCardDelete(card) {
        api.setDeleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => {
            console.log(`Ошибка.....: ${err}`)
        });
    }

    function handleUpdateUser(item) {
        api.setUserUpdate(item)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleUpdateAvatar(item) {
        api.setUserAvatar(item)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleAddPlaceSubmit(item) {
        api.setCreateCard(item)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка.....: ${err}`)
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmPopupClick(card) {
        setCard(card);
        setIsConfirmPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setSelectedCard({name: '', link: ''});
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header/>

                    <Switch>
                        <Route path="/register">
                            <Register />
                        </Route>

                        <Route path="/login">
                            <Login />
                        </Route>

                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleConfirmPopupClick}
                        cards={cards}
                    />

                    </Switch>

                    <Footer/>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}/>

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}/>

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}/>

                    <ConfirmDeletePlacePopup
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        onConfirmDelete={handleCardDelete}
                        card={card}/>

                    <ImagePopup
                        onClose={closeAllPopups}
                        card={selectedCard}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
