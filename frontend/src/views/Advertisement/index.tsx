/* const MongoClient = require('mongodb').MongoClient;
 */

/* const url =
  'mongodb+srv://dbuser:TestMongodbUser@cluster0.5uh5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
 */
/* eslint-disable jsx-a11y/alt-text */
import './Advertisement.scss';

/* import { contractABI, contractAddress } from 'abi/contract';
import { Button, Col, Input, Modal, Radio, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { handleError, handleSuccess } from 'utils/common';
import React, { useState } from 'react';
*/
import { Button, Col, Input, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const dummyAds: any[] = [
  {
    title: 'Books',
    description: 'Love books? Explore our collection',
    id: 1,
    url: 'https://www.hachettebookgroup.com/genre/fiction/romance-fiction/',
    status: 'Voting in Progress',
  },
  {
    title: 'Real Estate',
    description: '9000+ homes for sale in New York',
    id: 2,
    url: 'https://www.sothebysrealty.com/eng/sales/new-york-ny-usa',

    status: 'Accepted',
  },
  {
    title: 'Oasis Network',

    description: 'Oasis Network. Next frontier in privacy-enabled blockchain',
    id: 3,
    url: 'https://oasisprotocol.org/',

    status: 'Published',
  },
  {
    title: 'Rental Homes',
    description: 'You have a home anywhere in the world',
    id: 4,
    url: 'https://airbnb.com',

    status: 'Rejected',
  },
];

const Advertisement = () => {
  /*
  ===========
  STATE HOOKS
  ===========
  */

  const [ads, setAds] = useState(dummyAds);

  const [adTitle, setAdTitle] = useState('');
  const [adDesc, setAdDesc] = useState('');
  const [adUrl, setAdUrl] = useState('');

  const [dummyState, setDummyState] = useState(0);

  useEffect(() => {
    fetchAds();
    /* fetch('/getAdvertisements')
      .then((res) => res.json())
      .then((json) => setAds(json)); */
  }, [dummyState]);

  /*
  =========
  FUNCTIONS
  =========
  */

  const fetchAds = async () => {
    const res = await fetch('http://localhost:3001/getAdvertisements');
    const json = await res.json();

    setAds(json);
  };

  function insertAdvertisement(
    advertisementId: any,
    date: any,
    advertisementTitle: any,
    advertisementDescription: any,
    advertisementUrl: any,
    advertisementStatus: any,
  ) {
    const newAdvertisement = {
      advertisementId: advertisementId,
      date: date,
      advertisementTitle: advertisementTitle,
      advertisementDescription: advertisementDescription,
      advertisementUrl: advertisementUrl,
      advertisementStatus: advertisementStatus,
    };

    axios.post('http://localhost:3001/bidAdvertisement', newAdvertisement);
    setDummyState((prev) => prev + 1);

    /* 
    const client = await MongoClient.connect(url, {
      // useNewUrlParser: true,
    }).catch((err: any) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const db = client.db('myFirstDatabase');

      let collection = db.collection('advertisements');

      let advertisement = {
        advertisementId: advertisementId,
        date: date,
        advertisementTitle: advertisementTitle,
        advertisementDescription: advertisementDescription,
        advertisementUrl: advertisementUrl,
        advertisementStatus: advertisementStatus,
      };

      let postID = (await collection.insertOne(advertisement)).insertedId;

      console.log(postID);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    } */
  }

  const addNewAd = () => {
    if (adTitle.trim() !== '' && adUrl.trim() !== '' && adDesc.trim() !== '') {
      // DECLARING THE ID OF THE NEW AD BID
      /* const advertisementId = ads[ads.length - 1].id + 1; */

      const advertisementId = 5;

      /* setAds((prev) => [
        ...prev,

        {
          title: adTitle,
          description: adDesc,
          url: adUrl,
          id: advertisementId,
          status: 'Voting in Progress',
        },
      ]); */

      // VARIABLES TO INSERT INTO TABLE, ALSO INCLUDES advertisementId WHICH'S ABOVE

      const d = new Date();
      const date = d.toLocaleDateString() + '\n' + d.toLocaleTimeString();

      const advertisementTitle = adTitle;

      const advertisementDescription = adDesc;

      const advertisementUrl = adUrl;

      const advertisementStatus = 'Voting in Progress';

      // LOGGING INFO ABOUT NEW AD BID MINTING TO CONSOLE

      const consoleMsg =
        '**************************' +
        '\n\nYou have minted a new advertisement bid!' +
        '\n\nAdvertisement ID: ' +
        advertisementId +
        '\n\nAdvertisement Title: ' +
        advertisementTitle +
        '\n\nAdvertisement Description: ' +
        advertisementDescription +
        '\n\nAdvertisement URL: ' +
        advertisementUrl +
        '\n\nAdvertisement Status: ' +
        advertisementStatus +
        '\n\nDate: ' +
        date +
        '\n\n**************************';

      console.log(consoleMsg);

      insertAdvertisement(
        advertisementId,
        date,
        advertisementTitle,
        advertisementDescription,
        advertisementUrl,
        advertisementStatus,
      );

      /*
      =====================================================
      INSERT THE FOLLOWING DATA TO THE ADVERTISEMENTS TABLE

      int advertisementId

      string date: Local date of the minting of ad bid

      string advertisementTitle

      string advertisementDescription

      string advertisemenUrl

      string advertisementStatus
      
      =====================================================
      */

      setAdTitle('');
      setAdDesc('');
      setAdUrl('');
    } else {
      alert('Please fill out everything');
    }
  };

  const updateAdvertisement = (id: any, newStatus: any) => {
    const update = {
      id: id,
      newStatus: newStatus,
    };

    axios.post('http://localhost:3001/updateAdvertisement', update);
    setDummyState((prev) => prev + 1);
  };

  const purchaseAd = (id: any) => {
    // FOR DATABASE CONNECTION, PLEASE CHECK OUT THE BELOW COMMENT

    const idToModify = id;

    const newAdvertisementStatus = 'Published';

    updateAdvertisement(idToModify, newAdvertisementStatus);

    // LOGGING INFO ABOUT CHANGING AD STATUS TO CONSOLE

    const consoleMsg =
      '**************************' +
      '\n\nYou have purchased your advertisement \nbid with the ID: ' +
      idToModify +
      '\n\nNew Advertisement Status: ' +
      newAdvertisementStatus +
      '\n\n**************************';

    console.log(consoleMsg);

    /*
     ===========================================================

     PLEASE FIND THE ROW WITH THE GIVEN idToModify AND REPLACE THE
     advertisementStatus OF THE ROW WITH THE NEW GIVEN NEW STATUS

     int idToModify

     string newAdvertisementStatus

     ===========================================================
     */
  };

  /* const [adTokens, setAdTokens] = useState(ads);
   const [newAd, setNewAd] = useState('');
  const [selectedAd, setSelectedAd] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVoteApproved, setIsVoteApproved] = useState(false);  */

  /* const showModal = (id: number) => {
    setIsModalVisible(true);
    setSelectedAd(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    vote(selectedAd, isVoteApproved);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onVoteChange = (e: any) => {
    setIsVoteApproved(e.target.value);
  }; */

  /* const mintAd = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.mintAd(
        'newAd',
        ethers.utils.parseEther('0.00001'),
      );

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
      setAdTokens([...adTokens, { description: newAd, id: adTokens.length + 1 }]);
    } catch (error: any) {
      handleError(error);
    }
  };

  const vote = async (id: number, val: boolean) => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.vote(id, val);

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
    } catch (error: any) {
      handleError(error);
    }
  };

  const getAdState = async (id: number) => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contractAddress, contractABI, signer);

      let transaction = await connectedContract.getAdState(id);

      await transaction.wait();
      handleSuccess(transaction);

      console.log(transaction);
    } catch (error: any) {
      handleError(error);
    }
  }; */

  return (
    <Row className="Advertisement">
      <Col span={10} style={{ marginTop: '-1em' }}>
        <div className="address-info">
          <h2>My Advertiser NFT</h2>
          {ads.length > 0 ? (
            <h3 className="address">0x7AaE98b06E576c34507488C0a5F1085AFffb2869</h3>
          ) : (
            <h3 className="no-nft">
              Please mint an advertisement bid to get your Advertiser NFT
            </h3>
          )}
        </div>
        <div className="AdvertisementCard">
          <Title level={2} style={{ margin: `0 0 20px 0` }}>
            Add new advertisement bid
          </Title>
          {/* <Input
            placeholder="Put your advertisement here"
            style={{ margin: `0 0 20px 0` }}
            value={newAd}
            onChange={(e) => setNewAd(e.target.value)}
          ></Input>
          <Button block size="large" className="button-fancy" onClick={mintAd}>
            {'Mint Ad'}
          </Button> */}
          <h3 className="advertisement-card-label">Advertisement Title</h3>
          <Input
            placeholder="Title"
            style={{ margin: `0 0 20px 0` }}
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
          ></Input>

          <h3 className="advertisement-card-label">Advertisement Description</h3>
          <Input
            placeholder="Description"
            style={{ margin: `0 0 20px 0` }}
            value={adDesc}
            onChange={(e) => setAdDesc(e.target.value)}
          ></Input>

          <h3 className="advertisement-card-label">Advertisement URL</h3>
          <Input
            placeholder="URL"
            style={{ margin: `0 0 20px 0` }}
            value={adUrl}
            onChange={(e) => setAdUrl(e.target.value)}
          ></Input>

          <Button block size="large" className="button-fancy" onClick={addNewAd}>
            {'Mint Ad Bid'}
          </Button>
        </div>
      </Col>
      <Col span={12} style={{ padding: `0 0 0 20px`, marginTop: '1em' }}>
        <Title level={2} style={{ margin: `0 0 30px 0`, textAlign: 'center' }}>
          My Advertisements
        </Title>
        {ads.length > 0 ? (
          <div>
            {[...ads].reverse().map((ad) => (
              <div className="VoteCard" key={ad._id}>
                <h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                  {ad.advertisementTitle}
                </h2>
                <p style={{ fontSize: '1.1rem', margin: '1.5em 0' }}>
                  {ad.advertisementDescription}
                </p>
                <div className="card-bottom">
                  <a
                    target="_blank"
                    className="ant-btn button-fancy"
                    href={ad.advertisementUrl}
                    title={ad.advertisementUrl}
                    rel="noreferrer"
                  >
                    Link
                  </a>
                  <div className="status">
                    Status:
                    <span
                      className={`status--${
                        ad.advertisementStatus === 'Accepted'
                          ? 'green'
                          : ad.advertisementStatus === 'Rejected'
                          ? 'red'
                          : ad.advertisementStatus === 'Published'
                          ? 'blue'
                          : 'dull'
                      }`}
                    >
                      {ad.advertisementStatus}
                    </span>
                    {ad.advertisementStatus === 'Accepted' && (
                      <button
                        className="ant-btn purchase-btn"
                        onClick={() => purchaseAd(ad._id)}
                      >
                        Purchase
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className="voteButton">
              <Button size="large" type="primary" onClick={() => showModal(ads.id)}>
                {'Vote'}
              </Button>
              <Button
                size="large"
                className="btn-fancy"
                onClick={() => getAdState(ads.id)}
              >
                {'Get Ad State'}
              </Button>
            </div> */}
              </div>
            ))}
          </div>
        ) : (
          <h2 className="no-bid">No advertisement bid minted yet</h2>
        )}
      </Col>
      {/* <Modal
        title="Do you want to approve this ad?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Radio.Group onChange={onVoteChange} value={isVoteApproved}>
          <Radio value={true}>A</Radio>
          <Radio value={false}>B</Radio>
        </Radio.Group>
      </Modal> */}
    </Row>
  );
};

export default Advertisement;