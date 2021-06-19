import { Route, useLocation, Switch } from 'react-router-dom';
import { Home, Login, Download_StegoPay, Amount } from './pages';
import { NavBar, ProtectedRoute } from './components';
import { Container, Card, Row, Col } from 'react-bootstrap';
import SetCookie from './pages/SetCookie';

function GetCurrentPath() {
  var location = useLocation();
  return location.pathname;
}
function App() {
  const path = GetCurrentPath();
  return (
    <div>
      <Container>
        <NavBar />

        <Route path='/setCookie/:customPath' render={(props) => <SetCookie {...props} />} />
        {path != '/download-stegopay' ?
          <Row noGutters={false}>
            <Col xs={6}>
              <Amount />
            </Col>

            <Col xs={6}>
              {/* "boxShadow": "2px 2px grey" */}
              <Card className="mt-5" style={{}}>

                <Switch>
                  <ProtectedRoute path='/' component={Home} exact />
                </Switch>
                <Route path='/login' component={Login} exact />
              </Card>
            </Col>

          </Row>
          :
          <></>
        }
        <Route path='/download-stegopay' component={Download_StegoPay} exact />


      </Container>

    </div>

  );
}

export default App;
