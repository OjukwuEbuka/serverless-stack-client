const dev =  {
    STRIPE_KEY: "pk_test_51GtaHFHjHTlbcgZtakZz9uNQZ8U01Onq3DTdsSEd92RmiUnJSGPlcKpMSlMwVDqMM8GaCSu26Z4eAlQY2eqcrFEu006ZeJRwMv",
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-2-api-dev-attachmentsbucket-hyhellkezv4r"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://qjdlaz7nni.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_it7HanPOl",
        APP_CLIENT_ID: "3um666eddjokupsha802ljk9n7",
        IDENTITY_POOL_ID: "us-east-1:6fa44389-224f-4796-965a-acbb134bf825"
    }
};

const prod =  {
    STRIPE_KEY: "pk_test_51GtaHFHjHTlbcgZtakZz9uNQZ8U01Onq3DTdsSEd92RmiUnJSGPlcKpMSlMwVDqMM8GaCSu26Z4eAlQY2eqcrFEu006ZeJRwMv",
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-2-api-prod-attachmentsbucket-qyp1bsynyp84"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://4qm0todjn3.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_rFgQ2sDW2",
        APP_CLIENT_ID: "6o1i3uuvis4epfe04b0cmmm2ee",
        IDENTITY_POOL_ID: "us-east-1:e20ecece-d9ba-4b2e-a440-b5b4facbacfe"
    }
};


// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};