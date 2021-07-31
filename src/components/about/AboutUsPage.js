import React, { useState } from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import "./AboutUsPage.css";

export const AboutUsPage = () => {

    const team = [
        {
          name: 'Anna Sawicka-Ziółkowska',
          title: 'Junior Frontend Developer',
          description: '',
          email: 'aniasawicka@gmail.com',
          image: 'img/about/ania.jpeg',
          github: 'https://github.com/AnnaSawickaZiolkowska',
          linkedin: 'https://www.linkedin.com/in/annasawickaziolkowska?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAeeoAG%2FmRbaLFI6YeUl78A%3D%3D',
        },
        {
          name: 'Agnieszka Skorupa',
          title: 'Junior Frontend Developer',
          description: '',
          email: 'agnieszka.agata.skorupa@gmail.com',
          image: 'img/about/aga.jpeg',
          github: 'https://github.com/agaskorupa',
          linkedin: 'https://www.linkedin.com/in/agnieszka-agata-skorupa',
          },
        {
          name: 'Przemysław Welenc',
          title: 'Junior Frontend Developer',
          description: '',
          email: 'przewelenc@gmail.com',
          image: 'img/about/przemek.jpeg',
          github: 'https://github.com/Przemo246',
          linkedin: 'https://www.linkedin.com/in/przemyslaw-welenc?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BuErsH6LuRpuWudHZW26DeQ%3D%3D',
        },
        {
            name: 'Marcin Tomkiewicz',
            title: 'Junior Fronted Developer',
            description: '',
            email: 'marc.tomk@gmail.com',
            image: 'img/about/marcin.jpeg',
            github: 'https://github.com/MarcinTomkiewicz',
            linkedin: 'https://www.linkedin.com/in/marcintomkiewicz?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BfMi60cHwTpWmt3Z1qiQJmQ%3D%3D',
          },
          {
            name: 'Dawid Ossowski',
            title: 'Junior Frontend Developer',
            description: '',
            email: 'ossowski.dawid@gmail.com',
            image: 'img/about/dawid.jpeg',
            github: 'https://github.com/ossowskid',
            linkedin: 'https://www.linkedin.com/in/dawid-ossowski?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjpqcNpQ2T9uGfnXGlTC%2Fxw%3D%3D'
          },
    ]

  const [showDescription, setShowDescription] = useState(false);  
  
  
      
  return (
    <>
    
    <div className="wrapper">
        <div className="team-header">
          <h2>Zespół Monster Hunt</h2>
          <p className="team-welcome">Cześć! Jesteśmy uczestnikami kursu Junior Fronted Developer w infoShare Academy. Nie spotkaliśmy się nigdy osobiście, ale pomimo dzielących nas odległości, trudności komunikacyjnych i różnic charakterów, udało nam się efektywnie współtworzyć Monster Hunt. Poznaj nasz zespół!
          </p>
        </div>
        <div  className="team-member-gallery">
            {team.map(person=> (
            <div className="team-member-card" key={person.email}>
              <img src={person.image} className="img" alt="team-member-img" onClick={() => setShowDescription(!showDescription)}/>
              <p className="team-member-data"><strong>{person.name}</strong></p>
              <p className="team-member-data">{person.title}</p>
              <p className="team-member-data">{person.description}</p>
              <p className="team-member-data">{person.email}</p>
              <ul className="team-member-data">
                <a href={person.github} className="icon">
                  <FaGithub color="#315e3c" size="20px"/> 
                </a>
                <a href={person.linkedin} className="icon">
                  <FaLinkedin color="#315e3c" size="20px" margin="20px" />
                </a>
              </ul>            
            </div>
            ))}
        </div>
        {showDescription && <div>Pokaż tekst</div>}
    </div>
   </>
  );
}



