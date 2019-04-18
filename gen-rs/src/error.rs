use chrono::ParseError as DateError;
use imagesize::ImageError;
use std::{io::Error as IOError, path::PathBuf, str::Utf8Error, string::FromUtf8Error};
use url::ParseError as UrlError;

#[derive(Debug)]
pub enum Error {
    IO(IOError),
    Utf8(Utf8Error),
    Date(DateError),
    Image(ImageError),
    Url(UrlError),
    MissingKeyword {
        keyword: &'static str,
        path: PathBuf,
    },
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
impl_from!(UrlError, Url);
impl_from!(Utf8Error, Utf8);

impl From<FromUtf8Error> for Error {
    fn from(err: FromUtf8Error) -> Self {
        Error::Utf8(err.utf8_error())
    }
}

impl From<(&'static str, PathBuf)> for Error {
    fn from(err: (&'static str, PathBuf)) -> Self {
        Error::MissingKeyword {
            keyword: err.0,
            path: err.1,
        }
    }
}

pub type Result<T> = std::result::Result<T, Error>;
