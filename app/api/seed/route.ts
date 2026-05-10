import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    const { error: catError } = await supabase
      .from('categories')
      .insert([
        { name: 'Central Govt Jobs', slug: 'central-govt', icon: 'building-2' },
        { name: 'Railway Jobs', slug: 'railway', icon: 'train' },
        { name: 'Defence Jobs', slug: 'defence', icon: 'shield' },
        { name: 'Police Jobs', slug: 'police', icon: 'badge' },
        { name: 'Banking Jobs', slug: 'banking', icon: 'landmark' },
        { name: 'Assam Jobs', slug: 'assam', icon: 'map-pin' },
        { name: 'Private Jobs', slug: 'private', icon: 'briefcase' },
      ]);

    if (catError && !catError.message.includes('duplicate')) {
      return Response.json({ error: catError.message }, { status: 400 });
    }

    const sampleJobs = [
      {
        title: 'Staff Selection Commission (SSC) COMBINED GRADUATE LEVEL EXAM',
        organization: 'SSC',
        category: 'Central Govt Jobs',
        vacancies: 5000,
        qualification: 'Bachelor\'s Degree from recognized university',
        age_limit: '18-32 years',
        salary: 'Rs. 25,500 - 81,100',
        application_fee: 'Rs. 100',
        selection_process: ['Tier I (CBT)', 'Tier II (CBT)', 'Tier III (Descriptive)', 'Document Verification'],
        how_to_apply: 'Apply online through SSC website before deadline',
        important_dates: {
          'Application Start Date': '01-June-2024',
          'Application End Date': '30-June-2024',
          'Admit Card Date': '15-July-2024',
          'Exam Date': '25-September-2024',
        },
        links: { 'Official Website': 'https://ssc.nic.in' },
        description: 'SSC CGLE is a recruitment exam conducted by Staff Selection Commission for various Group B and Group C posts.',
        slug: 'ssc-cgle-2024',
        is_active: true,
        is_trending: true,
      },
      {
        title: 'UPSC Civil Services Examination',
        organization: 'UPSC',
        category: 'Central Govt Jobs',
        vacancies: 1000,
        qualification: 'Bachelor\'s Degree',
        age_limit: '21-32 years',
        salary: 'Rs. 56,100 - 177,500',
        application_fee: 'Rs. 200',
        selection_process: ['Preliminary Exam', 'Main Exam', 'Interview'],
        how_to_apply: 'Apply online through UPSC portal',
        important_dates: {
          'Application Start': '01-February-2024',
          'Application Deadline': '22-February-2024',
          'Prelims Date': '26-May-2024',
        },
        links: { 'Official Website': 'https://upsc.gov.in' },
        description: 'UPSC CSE is one of the most prestigious examinations in India.',
        slug: 'upsc-cse-2024',
        is_active: true,
        is_trending: true,
      },
      {
        title: 'Indian Railways Recruitment',
        organization: 'Indian Railways',
        category: 'Railway Jobs',
        vacancies: 10000,
        qualification: '10th pass and above',
        age_limit: '18-33 years',
        salary: 'Rs. 19,900 - 63,200',
        application_fee: 'Rs. 0 (SC/ST)',
        selection_process: ['CBT', 'Physical Test', 'Document Verification'],
        how_to_apply: 'Apply through railway recruitment board website',
        important_dates: {
          'Notification Date': '15-April-2024',
          'Application Deadline': '15-May-2024',
          'Exam Date': '01-August-2024',
        },
        links: { 'Official Website': 'https://rrbonlinetym.org' },
        description: 'Recruitment for various railway positions including technician and clerk roles.',
        slug: 'indian-railways-recruitment-2024',
        is_active: true,
        is_trending: true,
      },
      {
        title: 'Banking Sector Jobs - IBPS PO',
        organization: 'IBPS',
        category: 'Banking Jobs',
        vacancies: 3000,
        qualification: 'Bachelor\'s Degree',
        age_limit: '20-30 years',
        salary: 'Rs. 27,620 - 50,000',
        application_fee: 'Rs. 850',
        selection_process: ['Prelims', 'Mains', 'Interview', 'Document Verification'],
        how_to_apply: 'Online registration on IBPS website',
        important_dates: {
          'Registration Start': '28-May-2024',
          'Registration End': '18-June-2024',
          'Prelims Exam': '14-July-2024',
        },
        links: { 'Official Website': 'https://ibps.in' },
        description: 'IBPS PO recruitment for Probationary Officer positions across bank branches.',
        slug: 'ibps-po-recruitment-2024',
        is_active: true,
        is_trending: false,
      },
      {
        title: 'Defence Research and Development Organisation Recruitment',
        organization: 'DRDO',
        category: 'Defence Jobs',
        vacancies: 500,
        qualification: 'B.Tech / B.Sc in relevant field',
        age_limit: '21-30 years',
        salary: 'Rs. 44,900 - 142,400',
        application_fee: 'Rs. 100',
        selection_process: ['Written Test', 'Interview'],
        how_to_apply: 'Apply through DRDO careers portal',
        important_dates: {
          'Application Start': '01-July-2024',
          'Application Deadline': '31-July-2024',
          'Result Date': '15-September-2024',
        },
        links: { 'Official Website': 'https://drdo.gov.in' },
        description: 'DRDO recruitment for scientist and engineer positions.',
        slug: 'drdo-recruitment-2024',
        is_active: true,
        is_trending: false,
      },
    ];

    const { error: jobError } = await supabase
      .from('jobs')
      .insert(sampleJobs);

    if (jobError && !jobError.message.includes('duplicate')) {
      return Response.json({ error: jobError.message }, { status: 400 });
    }

    const admitCards = [
      {
        title: 'SSC CGLE Admit Card 2024',
        organization: 'SSC',
        exam_date: '25-Sep-2024',
        download_link: 'https://ssc.nic.in',
        is_active: true,
      },
      {
        title: 'UPSC Prelims Admit Card',
        organization: 'UPSC',
        exam_date: '26-May-2024',
        download_link: 'https://upsc.gov.in',
        is_active: true,
      },
    ];

    const { error: admitError } = await supabase
      .from('admit_cards')
      .insert(admitCards);

    if (admitError && !admitError.message.includes('duplicate')) {
      return Response.json({ error: admitError.message }, { status: 400 });
    }

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
