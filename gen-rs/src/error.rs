//! Error module

use std::error;
use std::fmt;
use std::io::Error as IOError;
use std::path::PathBuf;
use std::str::Utf8Error;
use std::string::FromUtf8Error;

use chrono::ParseError;
use serde_json::Error as JsonError;

#[derive(Debug)]
pub enum Error {
    IO(IOError),
    Utf8(Utf8Error),
    Date(ParseError),
    Json(JsonError),
    MissingTitle(PathBuf),
    MissingDate(PathBuf),
    MissingTags(PathBuf),
    MissingSlug(PathBuf),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> ::std::result::Result<(), fmt::Error> {
        match self {
            Error::IO(err) => write!(f, "{}", err),
            Error::Utf8(err) => write!(f, "{}", err),
            Error::Date(err) => write!(f, "{}", err),
            Error::Json(err) => write!(f, "{}", err),
            Error::MissingTitle(path) => write!(f, "title not found for {:?}", path),
            Error::MissingDate(path) => write!(f, "date not found for {:?}", path),
            Error::MissingTags(path) => write!(f, "tags not found for {:?}", path),
            Error::MissingSlug(path) => write!(f, "slug not found for {:?}", path),
        }
    }
}

impl error::Error for Error {
    fn cause(&self) -> Option<&error::Error> {
        match self {
            Error::IO(err) => Some(err),
            Error::Utf8(err) => Some(err as &error::Error),
            Error::Date(err) => Some(err as &error::Error),
            Error::Json(err) => Some(err as &error::Error),
            Error::MissingTitle(_) => None,
            Error::MissingDate(_) => None,
            Error::MissingTags(_) => None,
            Error::MissingSlug(_) => None,
        }
    }
}

impl From<IOError> for Error {
    fn from(err: IOError) -> Self {
        Error::IO(err)
    }
}

impl From<Utf8Error> for Error {
    fn from(err: Utf8Error) -> Self {
        Error::Utf8(err)
    }
}

impl From<FromUtf8Error> for Error {
    fn from(err: FromUtf8Error) -> Self {
        Error::Utf8(err.utf8_error())
    }
}

impl From<ParseError> for Error {
    fn from(err: ParseError) -> Self {
        Error::Date(err)
    }
}

impl From<JsonError> for Error {
    fn from(err: JsonError) -> Self {
        Error::Json(err)
    }
}

pub type Result<T> = std::result::Result<T, Error>;
