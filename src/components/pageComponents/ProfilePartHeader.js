
import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearMe_Action } from '../../store/meReducer'
import errorImgPNG from '../images/errorImg.png'

function ProfilePartHeader({me}) {
    console.log('profile part header rerendered')
    const dispatch = useDispatch();

    const [dropDownVisible, setDropDownVisible] = useState(false);

    const logout = () => {
        axios.post('/token/logout', {
            refresh : window.localStorage.getItem('refresh')
        },{
            headers:{
                'Authorization' : 'Bearer ' + window.localStorage.getItem('access')
            }
        })
        .finally(() => {
            window.localStorage.removeItem('access')
            window.localStorage.removeItem('refresh')
            dispatch( clearMe_Action() )
            document.location.reload()
        })
    }
    console.log(me)
    return (me.id !== -1 ? 
              <li id='myProfile'>
                  <div>
                      <Link to={'/user/' + me.username}>
                        <img id='ProfilePic' src={me.profile_photo} onError={(e)=>{e.target.onerror = null; e.target.src=errorImgPNG}} alt='img' />
                      </Link>
                  </div>
                  <div id='profileBtn' className={dropDownVisible ? 'active' : null} onClick={() => setDropDownVisible(p => !p)}></div>
                  {dropDownVisible && <div id='profileDropdown'>
                      <ul>
                          <li>
                              <Link to={'/user/' + me.username}><span className='dropDown__listItem' id='Profile'>Profile</span></Link>
                          </li>
                          <li>
                              <Link to='/bookmarks'><span className='dropDown__listItem' id='Bookmark'>Bookmark</span></Link>
                          </li>
                          <li>
                              <Link to='/settings'><span className='dropDown__listItem' id='Settings'>Settings</span></Link>
                          </li>
                          <li>
                              <div onClick={logout}><span className='dropDown__listItem red' id='Exit'>Exit</span></div>
                          </li>
                      </ul>
                  </div>
                  }
                  
              </li>
              :
              <li>
                  <Link to='/registration'><button id='signup'>Sign Up</button></Link>
              </li>
    )
}

export default ProfilePartHeader
