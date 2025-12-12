DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments (
    Id VARCHAR(400) NOT NULL PRIMARY KEY,
    DateAndTime TIMESTAMP NOT NULL,
    ClientPhone VARCHAR(100),
    ClientEmail VARCHAR(255),
    FormName VARCHAR(255),
    ClientFullName VARCHAR(255),
    ClientSurname VARCHAR(100),
    ClientName VARCHAR(100),
    ClientPatronymic VARCHAR(100),
    PlanStart TIMESTAMP,
    PlanEnd TIMESTAMP,
    Comment TEXT,
    DoctorId INT,
    DoctorName VARCHAR(255),
    UtmSource VARCHAR(255),
    UtmMedium VARCHAR(255),
    UtmCampaign VARCHAR(255),
    UtmTerm VARCHAR(255),
    UtmContent VARCHAR(255),
    HttpReferer VARCHAR(500),
    
    CONSTRAINT chk_dates CHECK (PlanEnd IS NULL OR PlanStart IS NULL OR PlanEnd >= PlanStart),
    CONSTRAINT chk_duration CHECK (PlanEnd IS NULL OR PlanStart IS NULL OR 
                                  (EXTRACT(EPOCH FROM (PlanEnd - PlanStart)) / 3600) <= 12),
    CONSTRAINT chk_name_fields CHECK (
        (ClientFullName IS NOT NULL AND 
         ClientSurname IS NULL AND 
         ClientName IS NULL AND 
         ClientPatronymic IS NULL)
        OR
        (ClientFullName IS NULL AND 
         (ClientSurname IS NOT NULL OR 
          ClientName IS NOT NULL OR 
          ClientPatronymic IS NOT NULL))
        OR
        (ClientFullName IS NULL AND 
         ClientSurname IS NULL AND 
         ClientName IS NULL AND 
         ClientPatronymic IS NULL)
    )
);