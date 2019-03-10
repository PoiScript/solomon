use std::io::Error as IOError;
use std::path::PathBuf;
use std::str::Utf8Error;
use std::string::FromUtf8Error;

use chrono::ParseError;

#[derive(Debug)]
pub enum Error {
    IO(IOError),
    Utf8(Utf8Error),
    Date(ParseError),
    MissingTitle(PathBuf),
    MissingDate(PathBuf),
    MissingTags(PathBuf),
    MissingSlug(PathBuf),
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

pub type Result<T> = std::result::Result<T, Error>;
