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
} from '../styles/Common';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiSad } from 'react-icons/bi';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { useContainerDimensions } from '../hooks/getContainerDimensions';
import RenderSearchbar from '../components/Searchbar';
import Topper from '../components/Topper';

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
      <Topper picture={picture} />
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
