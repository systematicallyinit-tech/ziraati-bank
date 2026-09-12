import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req) => ({ id: "fakeId" });

export const ourFileRouter = {
  accountOpeningForm: f({
    image: {
      maxFileSize: "10MB",
      maxFileCount: 1,
    },

    pdf: {
      maxFileSize: "10MB",
      maxFileCount: 1,
    },

    "application/msword": {
      maxFileSize: "10MB",
      maxFileCount: 1,
    },

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "10MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return {
        userId: user.id,
      };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("File URL:", file.ufsUrl);

      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
};
