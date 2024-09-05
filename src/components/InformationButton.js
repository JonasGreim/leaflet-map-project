import informationButtonImage from './../images/informationButton.png';
import '../popUp.css';

export const InformationButton = () => {
    const infoText = `The headquarters locations shown are sourced from Wikidata. 
    In some cases, only the city, not the exact coordinates, may be accurate. 
    Additionally, changes in a company's headquarters location over time are not considered, with only the most recent location shown.`
    return (
        <div className="information-button">
            <img className="information-button-img" src={informationButtonImage} alt="information Button"/>
            <span className="hover-text">{infoText}</span>
        </div>
    );
}