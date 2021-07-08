*** Settings ***
Documentation   Page object for header of ODAHU Web UI
Library         SeleniumLibrary  timeout=10s
Resource        ${PAGE_OBJECTS_RES}/keywords.robot

*** Variables ***
${HEADER.ODAHU_TITLE}            ODAHU
${HEADER.BENTO_HEADING}          ODAHU Components

${HEADER.CLOSE_BENTO_LOCATOR}    xpath:/html/body/div[2]/div[1]  # when bento menu open. it's another object on the page
${HEADER.BENTO_MENU.TAB}         xpath:/html/body/div[2]/div[3]

# Text locators
${HEADER.ODAHU_COMPONENTS.BENTO_TEXT}  xpath:/html/body/div[2]/div[3]/div[1]/h2
${HEADER.ODAHU_TITLE.TEXT}      xpath://*[@id="root"]/div/header/div/h6
${HEADER.ODAHU_UI_VERSION}      xpath:/html/body/div[4]/div[3]/div/h6
${HEADER.USER_INFO.USERNAME}    xpath:/html/body/div[3]/div[3]/div/h4
${HEADER.USER_INFO.EMAIL}       xpath:/html/body/div[3]/div[3]/div/h6

# ODAHU Components
${HEADER.BENTO_MENU.DOCS.TEXT}              Docs
${HEADER.BENTO_MENU.API_GATEWAY.TEXT}       API Gateway
${HEADER.BENTO_MENU.MLFLOW.TEXT}            ML Metrics
${HEADER.BENTO_MENU.SERVICE_CATALOG.TEXT}   Service Catalog
${HEADER.BENTO_MENU.GRAFANA.TEXT}           Cluster Monitoring
${HEADER.BENTO_MENU.ARGO.TEXT}              Argo Workflows
${HEADER.BENTO_MENU.JUPYTERHUB.TEXT}        JupyterHub
${HEADER.BENTO_MENU.AIRFLOW.TEXT}           Airflow
${HEADER.BENTO_MENU.KIBANA.TEXT}            Kibana
${HEADER.BENTO_MENU.FEEDBACK_STORAGE.TEXT}  Feedback storage

# ODAHU Components links
${HEADER.BENTO_MENU.DOCS.URL}                ${DOCS.URL}
${HEADER.BENTO_MENU.API_GATEWAY.URL}         ${EDGE_URL}/swagger/index.html
${HEADER.BENTO_MENU.MLFLOW.URL}              ${EDGE_URL}/mlflow/
${HEADER.BENTO_MENU.SERVICE_CATALOG.URL}     ${EDGE_URL}/service-catalog/catalog/index.html
${HEADER.BENTO_MENU.GRAFANA.URL}             ${EDGE_URL}/grafana/
${HEADER.BENTO_MENU.ARGO.URL}                ${EDGE_URL}/argo/workflows/
${HEADER.BENTO_MENU.JUPYTERHUB.URL}          ${EDGE_URL}/jupyterhub/hub/
${HEADER.BENTO_MENU.AIRFLOW.URL}             ${EDGE_URL}/airflow/
${HEADER.BENTO_MENU.KIBANA.URL}              ${EDGE_URL}/kibana/app/home


# ODAHU Components button locators
${HEADER.BENTO_MENU.DOCS}               xpath:.//button/img[@src="/img/logo/documentation.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.DOCS.TEXT}"]
${HEADER.BENTO_MENU.API_GATEWAY}        xpath:.//button/img[@src="/img/logo/swagger.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.API_GATEWAY.TEXT}"]
${HEADER.BENTO_MENU.MLFLOW}             xpath:.//button/img[@src="/img/logo/mlflow.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.MLFLOW.TEXT}"]
${HEADER.BENTO_MENU.SERVICE_CATALOG}    xpath:.//button/img[@src="/img/logo/swagger.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.SERVICE_CATALOG.TEXT}"]
${HEADER.BENTO_MENU.GRAFANA}            xpath:.//button/img[@src="/img/logo/grafana.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.GRAFANA.TEXT}"]
${HEADER.BENTO_MENU.ARGO}               xpath:.//button/img[@src="/img/logo/argo.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.ARGO.TEXT}"]
${HEADER.BENTO_MENU.JUPYTERHUB}         xpath:.//button/img[@src="/img/logo/jupyter.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.JUPYTERHUB.TEXT}"]
${HEADER.BENTO_MENU.AIRFLOW}            xpath:.//button/img[@src="/img/logo/airflow.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.AIRFLOW.TEXT}"]
${HEADER.BENTO_MENU.KIBANA}             xpath:.//button/img[@src="/img/logo/kibana.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.KIBANA.TEXT}"]
${HEADER.BENTO_MENU.FEEDBACK_STORAGE}   xpath:.//button/img[@src="/img/logo/gcs.png"]/following-sibling::*[1]/self::div/p[text()="${HEADER.BENTO_MENU.FEEDBACK_STORAGE.TEXT}"]

# Button locators
${HEADER.ODAHU_COMPONENTS.BENTO_BUTTON}  css:button[aria-label="account of current user"]
${HEADER.USER_INFO_BUTTON}       xpath://*[@id="root"]/div/header/div/div[3]/button
${HEADER.INFO_BUTTON}            xpath://*[@id="root"]/div/header/div/div[4]/button
${HEADER.LOG_OUT_BUTTON}         xpath:/html/body/div[3]/div[3]/div/button

*** Keywords ***
Validate Header Loaded
    Validate ODAHU Web UI page loaded  ${HEADER.ODAHU_TITLE.TEXT}  ${HEADER.ODAHU_COMPONENTS.BENTO_BUTTON}

Click on Empty field on "Dashboard" page when Bento Menu open
    click element  ${HEADER.CLOSE_BENTO_LOCATOR}

Open User info Tab
    click button  ${HEADER.USER_INFO_BUTTON}

Validate "Username" and "Email"
    Validate visible element and text  ${HEADER.USER_INFO.USERNAME}  ${COMMON.USER_INFO.USERNAME.TEXT}
    Validate visible element and text  ${HEADER.USER_INFO.EMAIL}  ${COMMON.USER_INFO.EMAIL.TEXT}

Click "LOG OUT" Button
    click button  ${HEADER.LOG_OUT_BUTTON}

Click "Info" button
    click button  ${HEADER.INFO_BUTTON}

Validate text of "Info" pop-up
    [Arguments]  ${odahu_ui_version}
    Validate visible element and text  ${HEADER.ODAHU_UI_VERSION}  ${odahu_ui_version}

Open Bento Menu (ODAHU Components)
    click button  ${HEADER.ODAHU_COMPONENTS.BENTO_BUTTON}

Validate Bento Menu
    wait until element contains  ${HEADER.ODAHU_COMPONENTS.BENTO_TEXT}  ${HEADER.BENTO_HEADING}
    wait until element is visible  ${HEADER.BENTO_MENU.TAB}
    element should be visible  ${HEADER.BENTO_MENU.TAB}

Validate Bento Menu closed
    wait until element is not visible  ${HEADER.BENTO_MENU.TAB}
    element should not be visible  ${HEADER.BENTO_MENU.TAB}

Validate ODAHU components visible and description present
    # button description: css path to description           -> button > div > p
    # button_locator    : css to the image of the button    -> button > img
    [Arguments]  ${button_locator}  ${button_description}
    page should contain element  ${button_locator}
    element should be visible  ${button_locator}
    # Validate visible element and text  ${button_locator} + div > p  ${button_description}

Validate ODAHU components links
    # ${button_locator} -> locator for button or tag inside the button
    # ${validation_url} -> URL which button leads to
    [Arguments]  ${button_locator}  ${validation_url}
    [Teardown]   run keywords
    ...          close window
    ...          AND  switch window  ${handle}
    page should contain element  ${button_locator}
    element should be visible  ${button_locator}
    click element  ${button_locator}
    ${handle}     switch window  locator=NEW
    wait until location contains  ${validation_url}  timeout=20s
