/*
  # Seed initial data for JobPulse India

  1. Insert categories
  2. Insert sample jobs
  3. Insert sample admit cards
*/

INSERT INTO categories (name, slug, icon) VALUES
  ('Central Govt Jobs', 'central-govt', 'building-2'),
  ('Railway Jobs', 'railway', 'train'),
  ('Defence Jobs', 'defence', 'shield'),
  ('Police Jobs', 'police', 'badge'),
  ('Banking Jobs', 'banking', 'landmark'),
  ('Assam Jobs', 'assam', 'map-pin'),
  ('Private Jobs', 'private', 'briefcase')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO jobs (title, organization, category, vacancies, qualification, age_limit, salary, application_fee, selection_process, how_to_apply, important_dates, links, description, slug, is_active, is_trending) VALUES
  (
    'SSC Combined Graduate Level Examination',
    'Staff Selection Commission',
    'Central Govt Jobs',
    5000,
    'Bachelor''s Degree from recognized university',
    '18-32 years',
    'Rs. 25,500 - 81,100',
    'Rs. 100',
    '["Tier I (CBT)", "Tier II (CBT)", "Tier III (Descriptive)", "Document Verification"]'::jsonb,
    'Apply online through SSC website before deadline. Complete all sections. Upload documents as required.',
    '{"Application Start Date": "01-June-2024", "Application End Date": "30-June-2024", "Admit Card Date": "15-July-2024", "Exam Date": "25-September-2024"}'::jsonb,
    '{"Official Website": "https://ssc.nic.in", "Official Notification PDF": "https://ssc.nic.in/pdf/notification"}'::jsonb,
    'SSC CGLE is a recruitment exam conducted by Staff Selection Commission for various Group B and Group C posts in government departments and offices.',
    'ssc-cgle-2024',
    true,
    true
  ),
  (
    'UPSC Civil Services Examination',
    'Union Public Service Commission',
    'Central Govt Jobs',
    1000,
    'Bachelor''s Degree',
    '21-32 years',
    'Rs. 56,100 - 177,500',
    'Rs. 200',
    '["Preliminary Exam", "Main Exam", "Interview"]'::jsonb,
    'Apply online through UPSC portal. Prepare for all three stages of the examination.',
    '{"Application Start": "01-February-2024", "Application Deadline": "22-February-2024", "Prelims Date": "26-May-2024", "Mains Date": "14-September-2024"}'::jsonb,
    '{"Official Website": "https://upsc.gov.in"}'::jsonb,
    'UPSC CSE is one of the most prestigious examinations in India for IAS, IPS and other All India Services.',
    'upsc-cse-2024',
    true,
    true
  ),
  (
    'Indian Railways Recruitment',
    'Indian Railways',
    'Railway Jobs',
    10000,
    '10th pass and above',
    '18-33 years',
    'Rs. 19,900 - 63,200',
    'Rs. 0 (SC/ST) Rs. 100 (Others)',
    '["CBT", "Physical Test", "Document Verification"]'::jsonb,
    'Apply through railway recruitment board website. Links available on official website.',
    '{"Notification Date": "15-April-2024", "Application Deadline": "15-May-2024", "Exam Date": "01-August-2024"}'::jsonb,
    '{"Official Website": "https://rrbonlinetym.org"}'::jsonb,
    'Recruitment for various railway positions including technician, clerk and other roles across Indian Railways.',
    'indian-railways-recruitment-2024',
    true,
    true
  ),
  (
    'IBPS PO Probationary Officer Recruitment',
    'Institute of Banking Personnel Selection',
    'Banking Jobs',
    3000,
    'Bachelor''s Degree',
    '20-30 years',
    'Rs. 27,620 - 50,000',
    'Rs. 850',
    '["Prelims", "Mains", "Interview", "Document Verification"]'::jsonb,
    'Online registration on IBPS website. Complete all stages for final selection.',
    '{"Registration Start": "28-May-2024", "Registration End": "18-June-2024", "Prelims Exam": "14-July-2024", "Mains Exam": "18-August-2024"}'::jsonb,
    '{"Official Website": "https://ibps.in"}'::jsonb,
    'IBPS PO recruitment for Probationary Officer positions across bank branches in India.',
    'ibps-po-recruitment-2024',
    true,
    false
  ),
  (
    'DRDO Scientist and Engineer Recruitment',
    'Defence Research and Development Organisation',
    'Defence Jobs',
    500,
    'B.Tech / B.Sc in relevant field',
    '21-30 years',
    'Rs. 44,900 - 142,400',
    'Rs. 100',
    '["Written Test", "Interview"]'::jsonb,
    'Apply through DRDO careers portal. Submit required documents for verification.',
    '{"Application Start": "01-July-2024", "Application Deadline": "31-July-2024", "Result Date": "15-September-2024"}'::jsonb,
    '{"Official Website": "https://drdo.gov.in"}'::jsonb,
    'DRDO recruitment for scientist and engineer positions in defence research and development.',
    'drdo-recruitment-2024',
    true,
    false
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO admit_cards (title, organization, exam_date, download_link, is_active) VALUES
  ('SSC CGLE Admit Card 2024', 'SSC', '25-Sep-2024', 'https://ssc.nic.in/admit-card', true),
  ('UPSC Prelims Admit Card', 'UPSC', '26-May-2024', 'https://upsc.gov.in/admit-card', true),
  ('Railways RRB Admit Card', 'Indian Railways', '01-Aug-2024', 'https://rrbonlinetym.org/admit-card', true)
ON CONFLICT DO NOTHING;
