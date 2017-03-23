import * as request from '../actions/data'

import Map from './Map'
import LeftMenu from './LeftMenu'
import Popup from './Popup'
import TimeSlider from './TimeSlider'
import UserCard from './UserCard'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div class="mdc-theme--dark">
            <Map/>
            <LeftMenu/>
            <UserCard/>
            <Popup/>
            <TimeSlider/>
        </div>
    }
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        request: Redux.bindActionCreators(request, dispatch)
    }
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)

