export default class Popup extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return <div className="mdc-card mdc-card--theme-dark" id="popup" style={{
            background:"rgba(70,70,100,0.75)",
            width:"200px",
            display:"none"
        }}>
            <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">Marker</h1>
                <h2 className="mdc-card__subtitle">Subtitle here</h2>
            </section>
            <section className="mdc-card__supporting-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </section>
            <section className="mdc-card__actions">
                <button className="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
            </section>
        </div>
    }
}






