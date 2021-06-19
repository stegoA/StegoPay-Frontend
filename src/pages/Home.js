import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { fetchCard } from '../actions/card_actions';
import { Button, Alert, Modal, Spinner } from 'react-bootstrap'
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';
import { pay } from '../api/pay';
import { logOut, error } from '../actions/auth_actions';
import './styles/Home.css';
import { Spinner_component } from '../components'

class HomeComponent extends Component {

    //Set a cookies prop, to include all the cookies
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    //Constructor, sets the initial state for this component
    constructor(props) {
        super(props);
        this.state = { selectedButton: null, currentCardIndex: 0, currentImage: null, paymentInProcess: false, paymentSuccessful: false };
    }

    async componentDidMount() {
        //Fetch card action from props
        const { fetchCard } = this.props;

        //fetch cards
        await fetchCard();

        //if there is an error fetching cards
        if (this.props.error_fetching_card) {
            //log the user out
            this.props.logOut();

            //if the response status is 401 which means that the session is expired (JWT Token is expired)
            //display the error
            if (this.props.error_fetching_card.response.status == 401) {
                this.props.error('Session Expired');
            }

            //Else display the error from the server
            else {
                this.props.error(this.props.error_fetching_card.response.data.error);
            }
        }

        // If no cards are found
        else if (this.props.card.length == 0) {
            this.props.logOut();
            this.props.error('No cards found, please add a card by using the StegoPay Android application.')
        }

        //Set current image of the carousel to the 1st image card in the cards array.
        else {
            this.setState({ currentImage: this.props.card[this.state.currentCardIndex].image });
        }
    }

    //On click of next card button
    nextCard() {
        //set new card index to current card index + 1
        const newCardIndex = this.state.currentCardIndex + 1;

        //If new card index exceeds the cards array length then return
        if (newCardIndex > this.props.card.length - 1) {
            return;
        }

        //else set the current image to the image of the card at newCardIndex
        this.setState({ currentCardIndex: newCardIndex, currentImage: this.props.card[newCardIndex].image });

    }

    //On click of previous card
    previousCard() {

        //Set new index
        const newCardIndex = this.state.currentCardIndex - 1;

        //If the new index is less than 0 then return
        if (newCardIndex < 0) {
            return;
        }

        //set the image to be displayed to the user
        this.setState({ currentCardIndex: newCardIndex, currentImage: this.props.card[newCardIndex].image });
    }

    //On click of pay button
    async payButton() {
        try {
            //Set payment in process to true
            this.setState({ paymentInProcess: true });

            //Make a pay request to the server, with the cardId passed in the body
            const response = await pay({ cardId: this.state.selectedButton._id });

            console.log(response);

            //If payment is successful set payment in process to false and payment successful to true
            this.setState({ paymentInProcess: false, paymentSuccessful: true });

            setTimeout(() => {
                //Redirect to order received page/
                window.location.href = response.data.redirect_url;

                //Logging the user out 
                logOut();

                //Deleting the cookie as session is now over
                const { cookies } = this.props;
                cookies.remove("connect.sid", { path: '/' });
            }, 3000)
        }
        catch (e) {
            //If there is an error in payment
            //Set payment in process to false
            this.setState({ paymentInProcess: false });

            //Deleting the cookie
            const { cookies } = this.props;
            cookies.remove("connect.sid", { path: '/' });

            //Log the user out
            this.props.logOut();

            //If error is Session expired (Cookie expired, JWT Token expired)
            if (e.response.status == 401 || e.response.status == 402) {

                //set error message
                this.props.error('Session Expired');
            }
            //else if error is something other than session expired display the error message
            else {
                //set error message
                this.props.error(e.response.data.error);
            }

        }
    }

    selectCard() {
        const { currentCardIndex, selectedButton } = this.state;
        const { card } = this.props;

        //if no card is selected
        if (selectedButton == null) {
            //set selected card to the card clicked
            this.setState({ selectedButton: card[currentCardIndex] });
            return;
        }
        else {
            //selected card clicked again
            if (selectedButton._id == card[currentCardIndex]._id) {
                //Set selected card to null
                this.setState({ selectedButton: null });
                return;
            }
            //Some other card clicked again
            else {
                //set selected card to the card clicked
                this.setState({ selectedButton: card[currentCardIndex] });
            }
        }
    }

    render() {
        const { card } = this.props;
        const { currentCardIndex, currentImage, selectedButton, paymentInProcess, paymentSuccessful } = this.state;

        return (
            <div className="cont">
                <h5 align="center" style={{ marginTop: "3%" }}> Choose Stego-Card </h5>
                <div className="cont2" >

                    {
                        currentCardIndex != 0 ?
                            <BsFillCaretLeftFill className="backButton" onClick={() => this.previousCard()} />
                            :
                            <BsFillCaretLeftFill visibility='hidden' className="backButton" onClick={() => this.previousCard()} />
                    }

                    <div align="center" width="100%" style={{ marginTop: "4%" }}>
                        {
                            currentImage ?

                                <Button className={selectedButton != null && selectedButton._id == card[currentCardIndex]._id ? "active" : ""}
                                    variant="light" onClick={() => this.selectCard()}>

                                    <img src={`data:image/png;base64,${currentImage}`} height="225" width="360" style={{ "borderRadius": "3%" }} />
                                </Button>
                                :
                                <Spinner_component />

                            // <img src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`} height="225" width="360" style={{ "borderRadius": "3%" }} />
                            //  <Image src={`data:image/png;base64,${currentImage}`} thumbnail /> 
                        }
                    </div>
                    {
                        currentCardIndex == (card.length - 1) ?
                            <BsFillCaretRightFill visibility='hidden' className="nextButton" onClick={() => this.nextCard()} />
                            :
                            <BsFillCaretRightFill className="nextButton" onClick={() => this.nextCard()} />
                    }

                </div>
                <br />
                <div>
                    {
                        selectedButton == null ?
                            <Alert variant="warning" align="center"> No card selected</Alert>
                            :
                            <Alert variant="success" align="center"> Selected Card: ******{`${selectedButton.last4Digits}`}</Alert>
                    }
                </div>
                <br />
                <Button style={{ backgroundColor: "#6441A5", borderColor: "#6441A5", width: "65%" }} disabled={this.state.selectedButton == null} onClick={() => this.payButton()}>Pay</Button>
                <br /><br />
                {
                    paymentInProcess ?
                        <Modal show={true} size="lg" centered >
                            <Modal.Header >
                                <Modal.Title>Processing Payment</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p align="center">
                                    <Spinner animation="border"></Spinner>
                                </p>
                            </Modal.Body>

                        </Modal>
                        :
                        <></>
                }
                {
                    paymentSuccessful ?

                        <Modal show={true} size="lg" centered >
                            <Modal.Header >
                                <Modal.Title>Payment Successful</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p align="center">
                                    Redirecting...
                                </p>
                            </Modal.Body>
                        </Modal>

                        :
                        <></>
                }

            </div >
        )
    }
}

const mapStateToProps = ({ card }) => {
    return {
        fetching: card.fetching,
        card: card.card,
        error_fetching_card: card.error_fetching
    };
};


const Home = connect(mapStateToProps, { fetchCard, logOut, error })(withCookies(HomeComponent));
export { Home };