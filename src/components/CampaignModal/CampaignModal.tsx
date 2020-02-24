import React, { useContext } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { Link } from "gatsby";
import styles from "./CampaignModal.module.scss";
import BackgroundImage from 'gatsby-background-image';
import { WindowDimensionsContext } from "../../shared/WindowDimensionsProvider";

const CampaignModal = ({ visible, setVisible, modalBackground }) => {
    const { width } = useContext(WindowDimensionsContext);
    const modalStyle = {
        height: '375px',
        padding: 0
    }

    const backgroundStyle = {
        // Defaults are overwrite-able by setting one or each of the following:
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    }

    if (width >= 576) {
        backgroundStyle.backgroundSize = 'auto';
        backgroundStyle.height = '100%';
    }

    return (
        <Modal className={styles.campaignModal}
            centered footer={null}
            visible={visible}
            onCancel={() => setVisible(false)}
            bodyStyle={modalStyle}
            width="560px"
        >
            <BackgroundImage
                fluid={modalBackground.childCloudinaryAsset.fluid}
                loading='eager' style={backgroundStyle}>
                <Row className={styles.modalContent} type="flex" justify="center" align="middle">
                    <Col span={24} sm={12} className={styles.leftPanel}>

                        <h1 className="uppercase" style={{ marginBottom: 0 }}>Get 10% off</h1>
                        <p>all orders in March</p>

                    </Col>
                    <Col span={24} sm={12} className={styles.rightPanel}>
                        <p className="uppercase">Grand Opening</p>
                        <h1 style={{ marginBottom: 0 }} className="uppercase">Plus one free veil</h1>
                        <p>until 15/03/2020</p>
                        <div className={styles.buttonWrapper}>
                            <Link to='/booking'>
                                <Button >
                                    Book now
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </BackgroundImage>
        </Modal>
    )
};

export default CampaignModal;