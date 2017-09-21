export default class Artist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            popularity: 0,
            albumSales: 0,
            prevConserts: [],
            needs: '',
            approved: false,
            booked: false,
        }
    }

}