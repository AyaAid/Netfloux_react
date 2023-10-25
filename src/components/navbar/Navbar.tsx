import React from "react";
import "./Navbar.scss";

export default function Navbar() {


  return (
    <>
      <nav className="nav">
        <header>
          <div className="nav-left">
            <div className="nav-hamburger" onClick={() => hamburger()}>
              <div className="nav-hamburger-top"></div>
              <div className="nav-hamburger-middle"></div>
              <div className="nav-hamburger-bottom"></div>
            </div>

            <div className="nav-logo">
              <div className="nav-logo-child"></div>
            </div>
            <ul className="nav-high-screen">
              <li style={{ color: "white" }}>Accueil</li>
              <li>Calendrier</li>
              <li>Mes films</li>
              <li>Reprendre la lecture</li>
              <li>
                <div
                  className="menu-deroulant-triangle"
                  onClick={() => menuDeroulant()}
                ></div>
              </li>
              <li></li>
            </ul>
          </div>

          <div className="nav-right">
            <input
              type="text"
              className="nav-search"
              placeholder="Rechercher"
            />
            <div className="nav-bell">
              <div className="nav-bell-notif">
                <p>0</p>
              </div>
            </div>
            <div className="nav-profil"></div>
          </div>
        </header>

        <div className="menu-deroulant">
          <div className="menu-deroulant-profil">
            <ul>
              <li>
                <div className="menu-deroulant-profil-name">
                  <div className="menu-deroulant-profil-img"></div>
                  <p className="menu-deroulant-profil-pseudo">Kilian.rdgs</p>
                </div>
              </li>
              <li>Mes films</li>
              <li>Se déconnecter</li>
            </ul>
          </div>
          <div className="menu-deroulant-page">
            <ul>
              <li style={{ color: "white" }}>Accueil</li>
              <li>Calendrier</li>

              <li>Reprendre la lecture</li>
            </ul>
          </div>
          <div className="menu-deroulant-filtre">
            <ul>
              <li>Thrillers</li>
              <li>Jeunesse et famille</li>
              <li>SF</li>
              <li>Horreur</li>
              <li>Français</li>
              <li>Action</li>
              <li>Comédie</li>
              <li>Français</li>
              <li>Anime</li>
            </ul>
          </div>
        </div>

        <div className="menu-deroulant-high-screen">
          <ul>
            <li>Thrillers</li>
            <li>Jeunesse et famille</li>
            <li>SF</li>
            <li>Horreur</li>
            <li>Français</li>
            <li>Action</li>
            <li>Comédie</li>
            <li>Français</li>
            <li>Anime</li>
          </ul>
        </div>
      </nav>
    </>
  );

  var isActive = true;
  function hamburger() {
    var hamburger = document.querySelector(".nav");
    if (isActive) {
      hamburger!.classList.add("active");
    } else {
      hamburger!.classList.remove("active");
    }

    isActive = !isActive;
    console.log(isActive);
  }

  function menuDeroulant() {
    var hamburger = document.querySelector(".nav");
    if (isActive) {
      hamburger!.classList.add("active-high-screen");
    } else {
      hamburger!.classList.remove("active-high-screen");
    }

    isActive = !isActive;
    console.log(isActive);
  }
}
