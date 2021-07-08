*** Settings ***
Documentation   Page Object for "Dashboard" page
Library         SeleniumLibrary  timeout=10s
Resource        ${PAGE_OBJECTS_RES}/keywords.robot

*** Variables ***
# Text values
${DASHBOARD.HEADING}                Getting Started
${DASHBOARD.URL}                    ${EDGE_URL}/dashboard

# Docs urls
${DOCS.URL}               https://docs.odahu.org
${DOCS.QUICKSTART_LINK}   ${DOCS.URL}/tutorials_wine.html
${DOCS.CONNECTIONS_LINK}  ${DOCS.URL}/ref_connections.html
${DOCS.TRAINING_LINK}     ${DOCS.URL}/ref_trainings.html
${DOCS.PACKAGING_LINK}    ${DOCS.URL}/ref_packagers.html
${DOCS.DEPLOYMENT_LINK}   ${DOCS.URL}/ref_deployments.html

# Docs link locators
${DASHBOARD.LINKS_DROPDOWN}     xpath://*[@id="root"]/div/main/div[2]/div[1]/div
${DASHBOARD.LINKS_LIST}         ${DASHBOARD.LINKS_DROPDOWN}/div[4]/div/ul
${DASHBOARD.QUICKSTART_LINK}    ${DASHBOARD.LINKS_LIST}/a[1]/div/div[2]/span
${DASHBOARD.CONNECTIONS_LINK}   ${DASHBOARD.LINKS_LIST}/a[2]/div/div[2]/span
${DASHBOARD.TRAINING_LINK}      ${DASHBOARD.LINKS_LIST}/a[3]/div/div[2]/span
${DASHBOARD.PACKAGING_LINK}     ${DASHBOARD.LINKS_LIST}/a[4]/div/div[2]/span
${DASHBOARD.DEPLOYMENT_LINK}    ${DASHBOARD.LINKS_LIST}/a[5]/div/div[2]/span

# Dashboard chart frame locators
${DASHBOARD.CHART.CONNECTION}   xpath:.//div[contains(@class, "MuiGrid-spacing-xs-4")]/div/div[contains(@class, "MuiPaper-elevation1")]/div/div[2]/span/span[text()="Connections"]
${DASHBOARD.CHART.TRAINING}     xpath:.//div[contains(@class, "MuiGrid-spacing-xs-4")]/div/div[contains(@class, "MuiPaper-elevation1")]/div/div[2]/span/span[text()="Trainings"]
${DASHBOARD.CHART.PACKAGING}    xpath:.//div[contains(@class, "MuiGrid-spacing-xs-4")]/div/div[contains(@class, "MuiPaper-elevation1")]/div/div[2]/span/span[text()="Packaging"]
${DASHBOARD.CHART.DEPLOYMENT}   xpath:.//div[contains(@class, "MuiGrid-spacing-xs-4")]/div/div[contains(@class, "MuiPaper-elevation1")]/div/div[2]/span/span[text()="Deployment"]
*** Keywords ***
Validate "Dashboard" page loaded
    Validate page  ${DASHBOARD.URL}  ${DASHBOARD.HEADING}

Validate that chart is visible
    # chart frame:       //*[@id="root"]/div/main/div[2]/div/div[4]/div
    # chart description: //*[@id="root"]/div/main/div[2]/div/div[4]/div/div[1]/div[2]/span/span
    # chart canvas:      //*[@id="root"]/div/main/div[2]/div/div[4]/div/div[2]/canvas
    [Arguments]  ${chart_description}
    element should be visible  ${chart_description}
    element should be visible  ${chart_description}/../../../../div[2]/canvas
