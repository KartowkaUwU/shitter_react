import EngageLogoSVG from '../images/EngageLogo.svg';
import ThePoopManThinksAboutSVG from '../images/ThePoopManThinksAbout.svg';
import ManThinksSVG from '../images/ManThinks.svg';
import PoopPNG from '../images/Poop.png';
import ManOnPoopSVG from '../images/ManOnPoop.svg';

function EngageBanner() {
    return (
        <div id='EngageHolder'>
            <img id='EnagageLogo' src={EngageLogoSVG} alt='' />
            <div id='EngageText'>Engage in the ultimate social shetfest and express your feelings</div>
            <div id='EnagageImgHolder'>
                <img id='ThePoop' src={ThePoopManThinksAboutSVG} alt='' />
                <img id='Think' src={ManThinksSVG} alt='' />
                <img id='EngagePoop' src={PoopPNG} alt='' />
                <img id='EngageHumanOnPoop' src={ManOnPoopSVG} alt='' />
            </div>
        </div>
    )
}

export default EngageBanner
