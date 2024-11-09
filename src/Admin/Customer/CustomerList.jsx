import React, { useEffect, useRef, useState } from 'react';
import style from './CustomerList.module.css';
import { DeleteIcon, EmailIcon, LeftArrow, MessageIcon, Notificationicon, RightArrow, SearchIcon, Settingsicon } from '../../icons';
import Skeleton from 'react-loading-skeleton';
import { adminGetAllCustomerListAction } from '../../Redux/Admin/Actions/CustomerAction';
import { useDispatch, useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import api from '../../Redux/api/Api';
import { GET_ALL_CUSTOMERLIST_SUCCESS } from '../../Redux/Admin/Constants/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CustomerList = () => {
  const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
  const dispatch = useDispatch();
  const CustomerListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    CustomerListControllerRef.current = controller;

    dispatch(adminGetAllCustomerListAction(currentsalonId, controller.signal));

    return () => {
      if (CustomerListControllerRef.current) {
        CustomerListControllerRef.current.abort();
      }
    };
  }, [dispatch]);

  const adminGetAllCustomerList = useSelector(state => state.adminGetAllCustomerList);

  const {
    loading: adminGetAllCustomerListLoading,
    resolve: adminGetAllCustomerListResolve,
    getAllCustomers: AllCustomerList,
    currentPage,
    totalPages,
  } = adminGetAllCustomerList;

  const darkMode = useSelector(darkmodeSelector);
  const darkmodeOn = darkMode === 'On';

  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const searchCustomerhandler = async () => {
    setSearchLoading(true);
    try {
      const { data } = await api.get(`/api/customer/getAllCustomers?salonId=${currentsalonId}&name=${search}`);
      dispatch({
        type: GET_ALL_CUSTOMERLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error('Error searching customers:', error);
    } finally {
      setSearchLoading(false);
    }
  };


  const [checkAllCustomers, setCheckAllCustomers] = useState(false);
  const [checkedCustomers, setCheckedCustomers] = useState({});
  const [checkedEmails, setCheckedEmails] = useState([]);
  const [checkMobileNumbers, setCheckMobileNumber] = useState([]);
  const [checkCustomerNames, setCheckCustomerNames] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentPage) {
      setPage(currentPage)
    }
  }, [currentPage])

  const paginationLeftHandler = async () => {
    if (page > 1) {
      try {
        const { data } = await api.get(`/api/customer/getAllCustomers?salonId=${currentsalonId}&page=${page - 1}`);
        dispatch({
          type: GET_ALL_CUSTOMERLIST_SUCCESS,
          payload: data,
        });
        setCheckAllCustomers(false)
        setPage(prevPage => prevPage - 1);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCheckAllCustomers(false)
      }
    }
  };

  const paginationRightHandler = async () => {
    if (page < totalPages) {
      try {
        const { data } = await api.get(`/api/customer/getAllCustomers?salonId=${currentsalonId}&page=${page + 1}`);
        dispatch({
          type: GET_ALL_CUSTOMERLIST_SUCCESS,
          payload: data,
        });
        setPage(prevPage => prevPage + 1);
        setCheckAllCustomers(false)
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCheckAllCustomers(false)
      }
    }
  };

  const customerEmailCheckedHandler = (customer) => {
    const isChecked = !checkedCustomers[customer._id];
    setCheckedCustomers(prevState => ({
      ...prevState,
      [customer._id]: isChecked,
    }));

    if (isChecked) {
      setCheckedEmails(prevEmails => [...prevEmails, customer.email]);
      setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, Number(`${customer.mobileCountryCode}${customer.mobileNumber}`)]);
      setCheckCustomerNames(prevNames => [...prevNames, customer.name]);
      setCheckAllCustomers(false)
    } else {
      setCheckedEmails(prevEmails => prevEmails.filter(email => email !== customer.email));
      setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== Number(`${customer.mobileCountryCode}${customer.mobileNumber}`)));
      setCheckCustomerNames(prevNames => prevNames.filter(name => name !== customer.name));
      setCheckAllCustomers(false)
    }
  };

  const checkAllCustomersHandler = (e) => {
    setCheckAllCustomers((prev) => {
      if (!prev) {
        const customerEmails = AllCustomerList.map((c) => c.email);
        const customerMobileNumbers = AllCustomerList.map((c) => Number(`${c.mobileCountryCode}${c.mobileNumber}`));
        const customerNames = AllCustomerList.map((c) => c.name);
        const allCheckedCustomers = AllCustomerList.reduce((acc, customer) => {
          acc[customer._id] = true;
          return acc;
        }, {});
        setCheckedEmails(customerEmails);
        setCheckMobileNumber(customerMobileNumbers);
        setCheckCustomerNames(customerNames);
        setCheckedCustomers(allCheckedCustomers);
      } else {
        setCheckedEmails([]);
        setCheckMobileNumber([]);
        setCheckCustomerNames([]);
        setCheckedCustomers({});
      }

      return !prev;
    });
  };


  const navigate = useNavigate();

  const sendEmailNavigate = () => {
    if (checkedEmails.length > 0) {
      navigate('/admin-customer/send-email', { state: checkedEmails });
    } else {
      toast.error("Atleast one customer needed", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

  };

  const sendMessageNavigate = () => {
    // console.table(checkMobileNumbers)
    if (checkMobileNumbers.length > 0) {
      navigate('/admin-customer/send-message', {
        state: {
          checkMobileNumbers,
          checkCustomerNames,
        },
      });
    } else {
      toast.error("Atleast one customer needed", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

  };

  return (
    <div className={`${style.customer_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Customer List</p>

        <div>
          <div className={`${style.customer_search} ${darkmodeOn && style.dark}`}>
            <input
              type="text"
              placeholder='Search Customer'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div onClick={searchCustomerhandler}><SearchIcon /></div>
          </div>

          <button className={`${style.customer_send_btn} ${darkmodeOn && style.dark}`} onClick={sendEmailNavigate}>
            <div><EmailIcon /></div>
          </button>

          <button className={`${style.customer_send_btn} ${darkmodeOn && style.dark}`} onClick={sendMessageNavigate}>
            <div><MessageIcon /></div>
          </button>
        </div>

      </div>

      <div className={`${style.customer_content_wrapper} ${darkmodeOn && style.dark}`}>
        {adminGetAllCustomerListLoading || searchLoading ? (
          <div className={style.customer_content_body}>
            <Skeleton
              count={6}
              height={'6rem'}
              style={{ marginBottom: '1rem' }}
              baseColor={darkmodeOn ? 'var(--darkmode-loader-bg-color)' : 'var(--lightmode-loader-bg-color)'}
              highlightColor={darkmodeOn ? 'var(--darkmode-loader-highlight-color)' : 'var(--lightmode-loader-highlight-color)'}
            />
          </div>
        ) : !adminGetAllCustomerListLoading && adminGetAllCustomerListResolve && AllCustomerList?.length > 0 ? (
          <div className={`${style.customer_content_body} ${darkmodeOn && style.dark}`}>
            <div>
              <div>
                <input
                  type="checkbox"
                  onChange={checkAllCustomersHandler}
                  checked={checkAllCustomers}
                />
              </div>
              <p>Name</p>
              <p>Email</p>
              <p>Gender</p>
              <p>Mobile No.</p>
            </div>

            {AllCustomerList.map((s, index) => (
              <div key={s._id}
                style={{
                  borderBottom: AllCustomerList.length - 1 === index && "none"
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={checkedCustomers[s._id] || false}
                    onChange={() => customerEmailCheckedHandler(s)}
                  />
                </div>
                <p>{s.name}</p>
                <p>{s.email}</p>
                <p>{s.gender}</p>
                <p>{s.mobileNumber}</p>
              </div>
            ))}
          </div>
        ) : !adminGetAllCustomerListLoading && adminGetAllCustomerListResolve && AllCustomerList?.length === 0 ? (
          <div className={`${style.customer_content_body_error} ${darkmodeOn && style.dark}`}>
            <p>Customers not available</p>
          </div>
        ) : (
          !adminGetAllCustomerListLoading && !adminGetAllCustomerListResolve && (
            <div className={`${style.customer_content_body_error} ${darkmodeOn && style.dark}`}>
              <p>Customers not available</p>
            </div>
          )
        )}
      </div>

      <div className={style.customer_pagination_wrapper}>
        <div>
          <div onClick={paginationLeftHandler}><LeftArrow /></div>
          <div onClick={paginationRightHandler} disabled={page === totalPages}><RightArrow /></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
