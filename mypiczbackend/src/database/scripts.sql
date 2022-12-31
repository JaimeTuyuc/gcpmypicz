-- Users Table ---
CREATE TABLE public.users
(
    "userId" serial NOT NULL,
    name text,
    "bio" text DEFAULT 'My profile on MyPicz',
    "lastName" text,
    email text,
    "userToken" text,
    password text,
    "isAuth" numeric DEFAULT 0,
    "userName" text,
    "isActive" numeric DEFAULT 1,
	"avatar" text DEFAULT '',
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("userId")
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

COMMENT ON TABLE public.users
    IS 'Table of users';


-- Albums table --
CREATE TABLE public.albums
(
    "albumId" serial NOT NULL,
    "belongsTo" serial,
    "albumName" text,
    "prevImgAlbum" text DEFAULT '',
    "totalItems" numeric DEFAULT 0,
    "albumColor" text DEFAULT 'gray',
    "activeAlbum" numeric DEFAULT 1,
    "createdAt" timestamp with time zone DEFAULT now(),
    CONSTRAINT "albumId" PRIMARY KEY ("albumId"),
    CONSTRAINT "userBelongs" FOREIGN KEY ("belongsTo")
        REFERENCES public.users ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.albums
    OWNER to postgres;

COMMENT ON TABLE public.albums
    IS 'This should be the tables of all my albums';

-- Single Image table --

CREATE TABLE public."singleImage"
(
    "imageId" serial NOT NULL,
    "belongsToAlbum" serial,
    "belongsToUser" serial,
    "imgUrl" text,
    "activeImage" numeric DEFAULT 1,
    "isPublicImg" numeric DEFAULT 0,
    "description" text DEFAULT '',
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("imageId"),
    CONSTRAINT "belongsToAlbum" FOREIGN KEY ("belongsToAlbum")
        REFERENCES public.albums ("albumId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "belongsToUser" FOREIGN KEY ("belongsToUser")
        REFERENCES public.users ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."singleImage"
    OWNER to postgres;

COMMENT ON TABLE public."singleImage"
    IS 'This is the table to save a single image that belongs to an album and belongs to a user.';

-- Table to save all images that does not have any album associated --
CREATE TABLE public."imageNoAlbum"
(
    "imageId" serial NOT NULL,
    "belongsToAlbum" integer DEFAULT 0,
    "belongsToUser" serial,
    "imgUrl" text,
    "activeImage" numeric DEFAULT 1,
    "isPublicImg" numeric DEFAULT 0,
    "description" text DEFAULT '',
    "createdAt" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("imageId"),
    CONSTRAINT "belongsToUser" FOREIGN KEY ("belongsToUser")
        REFERENCES public.users ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."imageNoAlbum"
    OWNER to postgres;

COMMENT ON TABLE public."imageNoAlbum"
    IS 'This table is to store all the images that does not have any album asociate.';
-- 1631956471
-- Some script to insert data --

-- Insert new users --

-- INSERT INTO albums ("belongsTo","albumName","prevImgAlbum","totalItems","albumColor","activeAlbum") VALUES (1,'Viajes','http//:holaimge.com',0, 'yellow', 1) 

-- SELECT * from users

-- SELECT "userId", "name", "lastName", "email", "userName", "isActive", "avatar", "createdAt" from users

-- select * from albums WHERE "belongsTo" = 5 AND albums."activeAlbum" = 1

-- insert into albums ("belongsTo", "albumName", "prevImgAlbum", "totalItems", "albumColor", "activeAlbum") values (6, 'Viajes', 'http//:img', 0, 'red', 1).

-- insert into albums ("belongsTo", "albumName", "activeAlbum") values (5, 'Personal', 1)

-- update albums set "albumName" = 'Negocios', "prevImgAlbum" = 'nuevo', "totalItems" = 0, "albumColor" = 'purple', "activeAlbum" = 1 WHERE "albumId" = 3 and "belongsTo" = 5


-- select * from users

-- select * from albums

-- select * from "sinlgeImage"

-- insert into "sinlgeImage" ("belongsToAlbum", "belongsToUser", "imgUrl") values (1,1,'https://concepto.de/wp-content/uploads/2019/11/volcan-e1574434320237.jpg') 


-- select * from "sinlgeImage" where "belongsToAlbum" = 1 and "belongsToUser" = 1

-- select * from "singleImage"

-- select * from "imageNoAlbum"

-- INSERT INTO "imageNoAlbum" ("belongsToUser","imageUrl") VALUES (1, 'https://concepto.de/wp-content/uploads/2019/11/volcan-e1574434320237.jpg') 


-- select * from "imageNoAlbum" where "belongsToUser" = 1

-- DELETE FROM "imageNoAlbum" WHERE "imageId" = 3  AND "belongsToUser" = 1

-- UPDATE "imageNoAlbum" SET "activeImage" = '0' WHERE "imageId" = 4 AND "belongsToUser" = 1
 --ALTER TABLE IF EXISTS public.users
   -- ADD COLUMN bio text;