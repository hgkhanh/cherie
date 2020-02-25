import React, { useContext } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { Link } from "gatsby";
import styles from "./CampaignModal.module.scss";
import { WindowDimensionsContext } from "../../shared/WindowDimensionsProvider";

const CampaignModal = ({ visible, setVisible, modalBackground }) => {
    const { width } = useContext(WindowDimensionsContext);
    let modalStyle = {
        maxHeight: '100vh',
        padding: 0,
    }
    let modalWidth = "560px";
    if (width > 576) {
        modalStyle.height = "400px";
        modalWidth = "640px";
    }
    const src = modalBackground.childCloudinaryAsset.fluid.src;
    let containerStyle = {
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundImage: "url(" + src + ")"
    }

    if (width > 576) {
        containerStyle.backgroundSize = "contain";
        containerStyle.backgroundSize = "50%";
        containerStyle.backgroundPosition = "left";
    }
    console.log(src);

    console.log(containerStyle);
    return (
        <Modal className={styles.campaignModal}
            centered footer={null}
            visible={visible}
            onCancel={() => setVisible(false)}
            bodyStyle={modalStyle}
            width={modalWidth}
        >
            <div style={containerStyle}>
                <Row className={styles.modalContent} type="flex" justify="center" align="middle">
                    <Col span={24} sm={12} className={styles.leftPanel}>
                        <h1 className="uppercase" style={{ marginBottom: 0 }}>Get 10% off</h1>
                        <p>all orders in March</p>
                    </Col>
                    <Col span={24} sm={12} className={styles.rightPanel}>
                        <p className="uppercase" style={{ marginBottom: 0 }}>Grand Opening</p>
                        <p>04/03/2020</p>
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
            </div>
        </Modal>
    )
};

export default CampaignModal;