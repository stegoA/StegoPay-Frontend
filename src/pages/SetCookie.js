import React from 'react';
import { useCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';

function SetCookie(props) {
    var { customPath } = props.match.params;
    const [cookie, setCookie] = useCookies(["connect.sid"]);

    var cookieValue = customPath.replace(/"/g, '');

    setCookie("connect.sid", cookieValue, { path: "/", maxAge: 600 });
    return (
        <Route>
            {<Redirect to='/' />}
        </Route>
    );

}

export default SetCookie;
