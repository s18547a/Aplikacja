import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getVisitList,
  getVisitListByAnimal,
  getVisitListByOwner,
} from "../../../../api/visitApiCalls";
import Visit from "../../../../classes/Visit";
import Pagination from "../../../List/Pagination";

import RegiserSuccessInfo from "../../../List/RegisterSuccessInfo";
import TableOrEmpty from "../../../List/TableOrEmpty";
import { getCurrentUser } from "../../../other/authHelper";
import { isManager, isOwner, isVet } from "../../../other/userType";
import SearchInput from "../../Shared/SearchImput";

function VisitList() {
  const [visitList, setVisitList] = useState<Visit[]>([]);
  const [empty, setEmpty] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [newId, setNewId] = useState("");
  const location = useLocation();

  const [pagedList,setPagedList]=useState<Visit[][]>([])
  const [selectedPage,setSelectedPage]=useState<number>(0);


  const divideListIntoPages=(visitList:Visit[])=>{
      const dowloadListLength:number=visitList.length;
    
      let numberOfPages=Math.ceil(dowloadListLength/10);
      
      
     
      const listOfListOnPage:Visit[][]=[];
      for(let i=0;i<numberOfPages*10;i=i+10){
       
        const pageList:Visit[]=visitList.slice(i,i+10);
        
        listOfListOnPage.push(pageList);
      }
      setPagedList(listOfListOnPage);
     

     

  }

  const loadVisits = async () => {
    let promise;
    let response;
    const curretUserId = getCurrentUser().userTypeId;
    if (isVet() || isManager()) {
      promise = getVisitList();
    }
    if (isOwner()) {
      promise = getVisitListByOwner(curretUserId);
    }
    if (promise) {
      promise
        .then((data) => {
          response = data;
          return data.json();
        })
        .then(
          (data) => {
            if (response.status == 200) {
              setVisitList(data);
              setEmpty(false);
              divideListIntoPages(data)
            }
            if (response.status == 404) {
              setEmpty(true);
            }
            if (response.status == 500) {
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  useEffect(() => {
    loadVisits();

    const state = location.state as { id: string };
    if (state != null) {
      setNewId(state.id);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSearch(value);
  }
  async function handleSearch() {
    let results;
    console.log(search);
    if (search != "") {
      await getVisitListByAnimal(search)
        .then((res) => {
          results = res;
          return res.json();
        })
        .then(
          (data) => {
            if (results.status == 200) {
              setEmpty(false);
              setVisitList(data);
              divideListIntoPages(data);
              navigate("/visits");
            }
            if (results.status == 404) {
              setEmpty(true);
              navigate("/visits");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }



  const changePage=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setSelectedPage(value)


  }
 
  


  return (
    <div className="container">
      <RegiserSuccessInfo newId={newId} message={"Nowa wizyta: "} />
      {
        <SearchInput
          onChange={handleChange}
          handleSearch={handleSearch}
          placeholder="Imie"
        />
      }
      <div className="card card-body shadow mt-5">
        <h5 className="card-title">Wizyty</h5>
        <TableOrEmpty Empty={empty}>
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>Data</th>
                <th>Zwierzę</th>
                <th>Weterynarz</th>
              </tr>
            </thead>

            <tbody>
              {pagedList[selectedPage]?.map((visit) => {
                return (
                  <tr
                    key={visit.VisitId}
                    onClick={() => {
                      navigate("/visits/" + visit.VisitId);
                    }}
                  >
                    <td>{visit.Date}</td>
                    <td>{visit.Animal.Name}</td>
                    <td>{`${visit.Vet.Name} ${visit.Vet.LastName}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableOrEmpty>
      </div>
     
        <Pagination
        pagedList={pagedList}
        selectedPage={selectedPage}
        changePage={changePage}
        setSelectedPage={setSelectedPage}
        />
   
    </div>
  );
}

export default VisitList;
