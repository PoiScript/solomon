use std::io::Error as IOError;
use std::path::PathBuf;
use std::str::Utf8Error;
use std::string::FromUtf8Error;

use askama::Error as TemplateError;
use chrono::ParseError as DateError;
use imagesize::ImageError;

#[derive(Debug)]
pub enum Error {
    IO(IOError),
    Utf8(Utf8Error),
    Date(DateError),
    Template(TemplateError),
    Minifier(&'static str),
    Image(ImageError),
    MissingTitle(PathBuf),
    MissingDate(PathBuf),
    MissingTags(PathBuf),
    MissingSlug(PathBuf),
    MissingSummary(PathBuf),
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

impl From<DateError> for Error {
    fn from(err: DateError) -> Self {
        Error::Date(err)
    }
}

impl From<TemplateError> for Error {
    fn from(err: TemplateError) -> Self {
        Error::Template(err)
    }
}

impl From<ImageError> for Error {
    fn from(err: ImageError) -> Self {
        Error::Image(err)
    }
}

pub type Result<T> = std::result::Result<T, Error>;
