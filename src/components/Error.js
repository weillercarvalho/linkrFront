import open from '../assets/images/Open.png';
import { useEffect, useRef, useState } from 'react';
import { getSearchUsers, getPicture } from '../services/Services';
import {
  Father,
  Nav1,
  Nav2,
  Mainline,
  SearchBar,
  SearchParent,
  SearchResults,
  SearchResult,
  SearchImg,
  RenderError,
} from './Common';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiSad } from 'react-icons/bi';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { useContainerDimensions } from './functions/getContainerDimensions';

export default function ErrorPage() {
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParameter, setSearchParemeter] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const navigate = useNavigate();
  const windowRef = useRef();
  const windowWidth = useContainerDimensions(windowRef).width;

  useEffect(() => {
    getPicture()
      .catch((r) => {
        console.log(r);
      })
      .then((r) => {
        setPicture(r.data.picture);
      });
  }, []);

  useEffect(() => {
    if (searchParameter.length > 2) {
      getSearchUsers(searchParameter)
        .catch((e) => console.log(e))
        .then((e) => setFoundUsers(e.data));
    } else {
      setSearchParemeter('');
    }
  }, [searchParameter]);

  return (
    <>
      <Father ref={windowRef}>
        <nav>
          <p onClick={() => navigate('/timeline')}>linkr</p>
          {windowWidth <= 375 ? (
            <></>
          ) : (
            <SearchParent>
              <SearchBar bottom={!foundUsers[0]}>
                <div>
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    onChange={(event) => {
                      if (event.target.value.length > 2) {
                        setSearchParemeter(event.target.value);
                      } else {
                        setSearchParemeter('');
                        setFoundUsers([]);
                      }
                    }}
                    placeholder={'Search for people'}
                  />
                </div>
                <div>
                  <AiOutlineSearch />
                </div>
              </SearchBar>
              {!foundUsers[0] ? (
                <></>
              ) : (
                <SearchResults>
                  {foundUsers.map((e, i) => {
                    return (
                      <SearchResult key={i}>
                        <SearchImg src={e.picture} alt="alt" />
                        <div onClick={() => navigate(`/user/${e.id}`)}>
                          {e.name}
                        </div>
                      </SearchResult>
                    );
                  })}
                </SearchResults>
              )}
            </SearchParent>
          )}

          <section>
            <Nav1>
              <img src={open} alt="" />
            </Nav1>
            <Nav2>
              <img src={picture} alt="" />
            </Nav2>
          </section>
        </nav>
      </Father>

      <Mainline>
        <RenderError>
          <BiSad />
          <div>
            <h1>ERROR</h1>
            <h1>404</h1>
          </div>
        </RenderError>
      </Mainline>
    </>
  );
}
