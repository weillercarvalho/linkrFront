import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { getSearchUsers } from '../services/Services';
import {
  SearchBar,
  SearchImg,
  SearchParent,
  SearchResult,
  SearchResults,
} from '../styles/Common';

export default function RenderSearchbar({ mobile, att, setAtt }) {
  const [searchParameter, setSearchParameter] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParameter.length > 2) {
      getSearchUsers(searchParameter)
        .catch((e) => console.log(e))
        .then((e) => setFoundUsers(e.data));
    } else {
      setSearchParameter('');
    }
  }, [searchParameter]);

  return (
    <SearchParent mobile={mobile}>
      <SearchBar mobile={mobile} bottom={!foundUsers[0]}>
        <div>
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            onChange={(event) => {
              if (event.target.value.length > 2) {
                setSearchParameter(event.target.value);
              } else {
                setSearchParameter('');
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
        <SearchResults mobile={mobile}>
          {foundUsers.map((e, i) => {
            return (
              <SearchResult key={i}>
                <SearchImg src={e.picture} alt="alt" />
                <div
                  onClick={() => {
                    navigate(`/user/${e.id}`, { state: { refresh: true } });
                    setSearchParameter('');
                    setFoundUsers([]);
                    setAtt(!att);
                  }}
                >
                  {e.name}
                </div>
              </SearchResult>
            );
          })}
        </SearchResults>
      )}
    </SearchParent>
  );
}
