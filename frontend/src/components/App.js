import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from "./Login";
import Register from "./Register";
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from "./InfoTooltip";
import successImage from "../images/Success.png";
import errorImage from "../images/Error.png";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [idCardForDelete, setIdCardForDelete] = React.useState(null);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [status, setStatus] = React.useState('');

  const [infoTooltipImage, setInfoTooltipImage] = React.useState('');

  const [email, setEmail] = React.useState('');

  const history = useHistory();

  // const handleTokenCheck = React.useCallback(() => {
  //   const jwt = localStorage.getItem('token');
  //   if (jwt) {
  //       auth.checkToken(jwt)
  //           .then((res) => {
  //               if (res.data) {
  //                   setLoggedIn(true);
  //                   setEmail(res.data.email);
  //                   history.push('/');
  //               }
  //           })
  //           .catch((err) => {
  //               history.push('signin');
  //               if (err === 400) {
  //                   console.log(`Ошибка: ${err} - Не передано одно из полей`)
  //               } else if (err === 401) {
  //                   console.log(`Ошибка: ${err} - Пользователь с email не найден`)
  //               }
  //           })
  //   }
  // }, [history]);
  const handleCookiesCheck = React.useCallback(() => {
    auth.cookiesCheck()
      .then((res) => {
        if (res.message === 'Unauthorized') {
          setLoggedIn(false);
          setEmail('');
          history.push('/signin');
        } else if (res.message === 'OK') {
          setLoggedIn(true);
          // setEmail(res.email);
          history.push('/');
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err.message);
      })
  }, [history]);

  React.useEffect(() => {
    handleCookiesCheck()
  }, [handleCookiesCheck]);

  React.useEffect(() => {
    if (!loggedIn) {
      return;
  }

    Promise.all([api.getUserData(), api.getInitialCards()])
            .then((values) => {
                const [userData, initialCards] = values;
                setCurrentUser(userData);
                setCards(initialCards);
                setEmail(userData.email);
                history.push('/');
            })
            .catch((err) => {
                console.log(`Ошибка: ${err.message}!`);
            });
    }, [history, loggedIn]);

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        if (res.email) {
          history.push('/signin');
          setStatus('Вы успешно зарегистрировались!');
          setInfoTooltipImage(successImage);
          setInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setStatus('Что-то пошло не так!\n' +
          'Попробуйте ещё раз.');
        setInfoTooltipImage(errorImage);
        setInfoTooltipOpen(true);
        if (err === 400) {
          console.log(`Ошибка: ${err} - Некорректно заполнено одно из полей`)
        }
      })
  }

  function handleLogin(data) {
    auth.login(data)
      .then(() => {
        setLoggedIn(true);
        setEmail(data.email);
        history.push('/');
      })
      .catch((err) => {
        setStatus('Что-то пошло не так!');
        setInfoTooltipImage(errorImage);
        setInfoTooltipOpen(true);
        if (err === 400) {
          console.log(`Ошибка: ${err} - Не передано одно из полей`)
        } else if (err === 401) {
          console.log(`Ошибка: ${err} - Пользователь с email не найден`)
        }
      })
  }

  function handleLogout() {
    auth.logout()
    .then(() => {
      setLoggedIn(false);
      setEmail('');
      history.push('/signin');
  })
  .catch((err) => {
      console.log(`Ошибка: ${err.message}!`);
  })
}

  function handleCardDeleteConfirm() {
    setIsLoading(true);
    api
      .deleteCard(idCardForDelete)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== idCardForDelete));
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleCardDeleteConfirm', err);
      }).finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardDelete(card) {
    setIdCardForDelete(card._id);
    setIsConfirmPopupOpen(true);
  }

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some((i) => i._id === currentUser._id);

  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api
  //     .changeLikeCardStatus(card._id, !isLiked)
  //     .then((newCard) => {
  //       setCards((state) =>
  //         state.map((c) => (c._id === card._id ? newCard : c)),
  //       );
  //     })
  //     .catch((err) => {
  //       console.log('handleCardLike', err);
  //     });
  // }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.message}!`);
        });
}

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
    setIdCardForDelete(null);
    setInfoTooltipImage('');
    setStatus('');
  }

  // const handleUpdateUser = (user) => {
  //   setIsLoading(true);
  //   api
  //     .setUserInfo(user)
  //     .then((newUser) => {
  //       setCurrentUser(newUser);
  //       closeAllPopups();
  //     })
  //     .catch((err) => {
  //       console.log('handleUpdateUser', err);
  //     }).finally(() => {
  //       setIsLoading(false);
  //     })
  // };

  const handleUpdateUser = (currentUser) => {
    setIsLoading(true);
    api.editUserData(currentUser)
        .then((data) => {
            setCurrentUser(data);
            setIsLoading(false);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.message}!`);
        })
        .finally(() => {
            setIsLoading(false);
        });
}

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .changeUserAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('handleUpdateAvatar', err);
      }).finally(() => {
        setIsLoading(false);
      })
  };

  // const handleAddPlaceSubmit = (place) => {
  //   setIsLoading(true);
  //   api
  //     .postNewCard(place)
  //     .then((newCard) => {
  //       setCards([newCard, ...cards]);
  //       setIsLoading(false);
  //       closeAllPopups();
  //     })
  //     .catch((err) => {
  //       console.log('handleAddPlaceSubmit', err);
  //     }).finally(() => {
  //       setIsLoading(false);
  //     })
  // };
  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true);
    api.postNewCard({name, link})
        .then((newCard) => {
            setCards([...cards, newCard]);
            setIsLoading(false);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err.message}!`);
        })
        .finally(() => {
            setIsLoading(false);
        });
}

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onLogout={handleLogout} />
        <Switch>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer loggedIn={loggedIn} />


        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDeleteCard={handleCardDeleteConfirm}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          title={status}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
