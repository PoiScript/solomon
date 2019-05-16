use chrono::ParseError as DateError;
use imagesize::ImageError;
use serde_json::Error as JsonError;
use std::{io::Error as IOError, str::Utf8Error, string::FromUtf8Error};
use url::ParseError as UrlError;

#[derive(Debug)]
pub enum Error {
    Date(DateError),
    IO(IOError),
    Image(ImageError),
    Json(JsonError),
    Url(UrlError),
    Utf8(Utf8Error),
}

macro_rules! impl_from {
    ($err:ident, $var:ident) => {
        impl From<$err> for Error {
            fn from(err: $err) -> Self {
                Error::$var(err)
            }
        }
    };
}

impl_from!(DateError, Date);
impl_from!(IOError, IO);
impl_from!(ImageError, Image);
impl_from!(JsonError, Json);
impl_from!(UrlError, Url);
impl_from!(Utf8Error, Utf8);

impl From<FromUtf8Error> for Error {
    fn from(err: FromUtf8Error) -> Self {
        Error::Utf8(err.utf8_error())
    }
}

pub type Result<T> = std::result::Result<T, Error>;
