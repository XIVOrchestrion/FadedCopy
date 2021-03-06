import {
  Home,
  Login,
  Register,
  Rolls,
  Settings,
  SettingsAddCharacter,
} from "./views"

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/rolls',
    component: Rolls,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
]

export const privateRoutes = [
  {
    path: '/settings/profile',
    component: Settings,
  },
  {
    path: '/settings/profile/new',
    component: SettingsAddCharacter,
  },
]


//<Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
//<Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
//<Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />
//<PrivateRoute path={`${process.env.PUBLIC_URL}/settings`} component={Settings} />
//<PrivateRoute path={`${process.env.PUBLIC_URL}/settings/profile`} component={Settings} /> */}
