import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "../detailFilm/DetailFilm.scss";

export default function DetailFilm() {
  return (
    <>
      <Navbar />
      <div className="column-film">
        <div className="detail-film-img"></div>
        <div className="detail-film-info">
          <div className="detail-film-info-left">
            <ul>
              <li>Interstellar</li>
              <li>SF</li>
              <li>2014</li>
              <li>Durée</li>
              <li>Note: ⭐️⭐️⭐️⭐️⭐️</li>
            </ul>
          </div>
          <div className="detail-film-info-right">
            <ul>
              <li>Distribution</li>
              <li>Réalisateur : Christopher Nolan</li>
              <li>Acteurs</li>
              <p>Mathew McConaughey, Anne Hathaway, Jessica Chastain</p>
            </ul>
          </div>
        </div>
        <div className="detail-film-description">
          <div className="detail-film-description-title">
            <p>Description</p>
          </div>
          <div className="detail-film-description-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              fugit commodi itaque eum dicta nihil consequuntur perspiciatis
              blanditiis sit vitae incidunt culpa explicabo aliquid, nulla est
              at, asperiores quo atque eos ex nobis natus quia expedita! Sunt
              consectetur, iusto reiciendis nemo architecto ullam. Aut
              recusandae culpa vero dolorem quaerat nostrum eligendi earum
              itaque adipisci laboriosam. Exercitationem excepturi alias impedit
              molestias sapiente eius laboriosam cum et aliquid magni soluta
              officiis, quibusdam illo, quod, voluptates maxime! Maxime ratione
              odio tempora hic, nulla magnam explicabo omnis, quam
              necessitatibus perspiciatis amet delectus sequi cum ea placeat
              aspernatur itaque impedit temporibus quisquam quae quia adipisci
              porro iste numquam? Eius aliquid accusantium placeat, quod, sint
              consectetur, pariatur totam asperiores praesentium natus quibusdam
              ipsum itaque autem. Officia asperiores a ab voluptatem veniam
              itaque corporis perspiciatis labore ratione vitae adipisci impedit
              sapiente, error fugit similique voluptas fuga quisquam neque unde?
              Dolor unde delectus explicabo. Consequuntur aperiam eveniet
              dolorem. Omnis voluptatum laudantium doloremque quia ab qui harum?
              Harum voluptatum perferendis totam repudiandae sint aperiam, illo
              nulla aliquam officia nemo earum quis minus laudantium ex animi
              dolore consequuntur! Consequatur accusamus aliquam nulla ipsam
              nemo maxime laboriosam velit animi quae omnis veniam, incidunt
              voluptatem quas quisquam debitis illum! Excepturi, saepe neque.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
